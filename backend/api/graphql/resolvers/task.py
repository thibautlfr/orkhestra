import strawberry
from typing import List
from api.graphql.types.task import TaskType
from database.models import TaskModel
from database.db import get_db
from api.graphql.directives.auth import hasRole


@strawberry.mutation
def create_task(
    info: strawberry.Info, title: str, status: str, project_id: int
) -> TaskType:
    hasRole(info, "ADMIN")

    db = info.context.db

    task = TaskModel(title=title, status=status, project_id=project_id)
    db.add(task)
    db.commit()
    db.refresh(task)

    info.context.task_event.set()

    return TaskType(
        id=task.id, title=task.title, status=task.status, project_id=task.project_id
    )
