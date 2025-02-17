import strawberry
from typing import AsyncGenerator
from strawberry.types import Info
import asyncio

from api.graphql.types.task import TaskType
from database.models import TaskModel
from database.db import get_db


@strawberry.type
class Subscription:
    @strawberry.subscription
    async def task_created(self, info: Info) -> AsyncGenerator[TaskType, None]:
        """
        Subscription to get the latest task created
        """
        while True:
            await info.context.task_event.wait()
            info.context.task_event.clear()

            db = next(get_db())
            last_task = db.query(TaskModel).order_by(TaskModel.id.desc()).first()
            if last_task:
                yield TaskType(
                    id=last_task.id,
                    title=last_task.title,
                    status=last_task.status,
                    project_id=last_task.project_id,
                )
