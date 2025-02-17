from fastapi import Request, HTTPException, Depends
from strawberry.fastapi import BaseContext
from api.utils.auth import decode_access_token
from database.db import get_db
from api.graphql.dataloaders.task_loader import TaskLoader


class CustomGraphQLContext(BaseContext):
    def __init__(self, user: dict = None, db=None, task_loader=None):
        self.user = user
        self.db = db
        self.task_loader = task_loader


async def get_current_user(request: Request):
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        return None

    token = auth_header.split(" ")[1]
    decoded_token = decode_access_token(token)

    if decoded_token is None:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    return decoded_token


async def custom_context_dependency(request: Request, user=Depends(get_current_user)):
    db = next(get_db())
    task_loader = TaskLoader(db)

    return CustomGraphQLContext(user=user, db=db, task_loader=task_loader)
