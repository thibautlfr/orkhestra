import strawberry
from typing import List
from api.graphql.types.user import UserType
from api.graphql.types.project import ProjectType
from database.models import UserModel, ProjectModel
from database.db import get_db


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
                    owner_id=project.owner_id
                ) for project in user.projects
            ]
        ) for user in users
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
                owner_id=project.owner_id
            ) for project in user.projects
        ]
    )


@strawberry.mutation
def create_user(username: str, password: str, role: str, email: str) -> UserType:
    db = next(get_db())
    user = UserModel(
        username=username, password=password, role=role, email=email)
    db.add(user)
    db.commit()
    return UserType(
        id=user.id,
        username=user.username,
        password=user.password,
        role=user.role,
        email=user.email,
        projects=[]
    )


@strawberry.mutation
def update_user(id: int, username: str, password: str, role: str, email: str) -> UserType:
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
                owner_id=project.owner_id
            ) for project in user.projects
        ]
    )


@strawberry.mutation
def delete_user(id: int) -> bool:
    db = next(get_db())
    user = db.query(UserModel).filter(UserModel.id == id).first()
    db.delete(user)
    db.commit()
    return True
