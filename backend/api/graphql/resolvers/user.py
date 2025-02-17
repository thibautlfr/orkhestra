import strawberry
from typing import List, Optional
from api.graphql.types.user import UserType
from api.graphql.types.project import ProjectType
from database.models import UserModel, ProjectModel
from database.db import get_db
from api.utils.auth import hash_password, verify_password, create_access_token


@strawberry.field
def get_users() -> List[UserType]:
    db = next(get_db())
    users = db.query(UserModel).all()
    return [
        UserType(
            id=user.id,
            username=user.username,
            password=user.password,
            role=user.role,
            email=user.email,
            projects=[
                ProjectType(
                    id=project.id,
                    title=project.name,
                    description=project.description,
                    owner_id=project.owner_id,
                )
                for project in user.projects
            ],
        )
        for user in users
    ]


@strawberry.field
def get_user(id: int) -> UserType:
    db = next(get_db())
    user = db.query(UserModel).filter(UserModel.id == id).first()
    return UserType(
        id=user.id,
        username=user.username,
        password=user.password,
        role=user.role,
        email=user.email,
        projects=[
            ProjectType(
                id=project.id,
                title=project.name,
                description=project.description,
                owner_id=project.owner_id,
            )
            for project in user.projects
        ],
    )


@strawberry.mutation
def create_user(username: str, password: str, role: str, email: str) -> UserType:
    db = next(get_db())
    user = UserModel(username=username, password=password, role=role, email=email)
    db.add(user)
    db.commit()
    return UserType(
        id=user.id,
        username=user.username,
        password=user.password,
        role=user.role,
        email=user.email,
        projects=[],
    )


@strawberry.mutation
def update_user(
    id: int, username: str, password: str, role: str, email: str
) -> UserType:
    db = next(get_db())
    user = db.query(UserModel).filter(UserModel.id == id).first()
    user.username = username
    user.password = password
    user.role = role
    user.email = email
    db.commit()
    return UserType(
        id=user.id,
        username=user.username,
        password=user.password,
        role=user.role,
        email=user.email,
        projects=[
            ProjectType(
                id=project.id,
                title=project.name,
                description=project.description,
                owner_id=project.owner_id,
            )
            for project in user.projects
        ],
    )


@strawberry.mutation
def delete_user(id: int) -> bool:
    db = next(get_db())
    user = db.query(UserModel).filter(UserModel.id == id).first()
    db.delete(user)
    db.commit()
    return True


@strawberry.mutation
def signup(username: str, password: str, email: str, role: str) -> UserType:
    db = next(get_db())

    existing_user = db.query(UserModel).filter(UserModel.username == username).first()
    if existing_user:
        raise Exception("User already exists")

    hashed_password = hash_password(password)

    user = UserModel(
        username=username, password=hashed_password, email=email, role=role, projects=[]
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    return UserType(
        id=user.id,
        username=user.username,
        password=user.password,
        email=user.email,
        role=user.role,
        projects=[],
    )


@strawberry.mutation
def login(email: str, password: str) -> Optional[str]:
    db = next(get_db())

    user = db.query(UserModel).filter(UserModel.email == email).first()
    if not user or not verify_password(password, user.password):
        raise Exception("Invalid username or password")

    token = create_access_token(
        {
            "user_id": user.id,
            "email": user.email,
            "username": user.username,
            "role": user.role,
        }
    )

    return token
