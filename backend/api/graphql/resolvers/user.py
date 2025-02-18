from fastapi import HTTPException
import strawberry
from typing import List, Optional
from api.graphql.directives.auth import hasRole
from api.graphql.types.user import UserType
from api.graphql.types.project import ProjectType
from database.models import UserModel
from database.db import get_db
from api.utils.auth import hash_password, verify_password, create_access_token


@strawberry.mutation
def delete_user(info: strawberry.Info) -> bool:
    hasRole(info, "ADMIN")

    db = info.context.db

    db.query(UserModel).filter(UserModel.id == info.context.user["user_id"]).delete()
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
