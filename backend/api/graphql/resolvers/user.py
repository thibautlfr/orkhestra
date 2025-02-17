import strawberry
from typing import List
from api.graphql.types.user import UserType
from api.graphql.types.project import ProjectType
from database.models import UserModel, ProjectModel
from database.db import get_db
from api.auth import hash_password, verify_password, create_access_token


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
                    name=project.name,
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
                name=project.name,
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
                name=project.name,
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
def signup(username: str, email: str, password: str, role: str) -> str:
    db = next(get_db())

    existing_user = (
        db.query(UserModel)
        .filter((UserModel.username == username) | (UserModel.email == email))
        .first()
    )
    if existing_user:
        raise Exception("Username or email already exists")

    hashed_pwd = hash_password(password)

    new_user = UserModel(username=username, email=email, password=hashed_pwd, role=role)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    token = create_access_token({"sub": new_user.id, "role": new_user.role})

    return token


@strawberry.mutation
def login(username: str, password: str) -> str:
    db = next(get_db())

    user = db.query(UserModel).filter(UserModel.username == username).first()
    if not user:
        raise Exception("User not found")

    if not verify_password(password, user.password):
        raise Exception("Invalid password")

    token = create_access_token({"sub": user.id, "role": user.role})

    return token
