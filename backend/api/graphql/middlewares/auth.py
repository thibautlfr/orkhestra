import asyncio
from fastapi import Request, HTTPException, Depends, WebSocket
from strawberry.fastapi import BaseContext
from api.utils.auth import decode_access_token
from database.db import get_db
from api.graphql.dataloaders.task_loader import TaskLoader


class CustomGraphQLContext(BaseContext):
    def __init__(self, user: dict = None, db=None, task_loader=None, task_event=None):
        self.user = user
        self.db = db
        self.task_loader = task_loader
        self.task_event = task_event


async def get_current_user(request: Request = None, websocket: WebSocket = None):
    token = None

    if request:
        auth_header = request.headers.get("Authorization")
        if auth_header and auth_header.startswith("Bearer "):
            token = auth_header.split(" ")[1]

    elif websocket:
        query_params = websocket.query_params
        token = query_params.get("token")

    if not token:
        return None

    decoded_token = decode_access_token(token)
    if decoded_token is None:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    return decoded_token


task_event = asyncio.Event()


async def custom_context_dependency(
    request: Request = None, websocket: WebSocket = None, user=Depends(get_current_user)
):
    db = next(get_db())
    task_loader = TaskLoader(db)
    return CustomGraphQLContext(
        user=user, db=db, task_loader=task_loader, task_event=task_event
    )
