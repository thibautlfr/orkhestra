import strawberry
from typing import List
from api.graphql.types.task import TaskType
from database.models import TaskModel
from database.db import get_db


@strawberry.field
def get_tasks() -> List[TaskType]:
    db = next(get_db())
    tasks = db.query(TaskModel).all()
    return [
        TaskType(
            id=task.id, title=task.title, status=task.status, project_id=task.project_id
        )
        for task in tasks
    ]


@strawberry.field
def get_task(id: int) -> TaskType:
    db = next(get_db())
    task = db.query(TaskModel).filter(TaskModel.id == id).first()
    return TaskType(
        id=task.id, title=task.title, status=task.status, project_id=task.project_id
    )


@strawberry.mutation
def create_task(
    info: strawberry.Info, title: str, status: str, project_id: int
) -> TaskType:
    db = next(get_db())

    task = TaskModel(title=title, status=status, project_id=project_id)
    db.add(task)
    db.commit()
    db.refresh(task)

    info.context.task_event.set()

    return TaskType(
        id=task.id, title=task.title, status=task.status, project_id=task.project_id
    )


@strawberry.mutation
def update_task(id: int, title: str, status: str, project_id: int) -> TaskType:
    db = next(get_db())
    task = db.query(TaskModel).filter(TaskModel.id == id).first()
    task.title = title
    task.status = status
    task.project_id = project_id
    db.commit()
    return TaskType(
        id=task.id, title=task.title, status=task.status, project_id=task.project_id
    )


@strawberry.mutation
def delete_task(id: int) -> bool:
    db = next(get_db())
    task = db.query(TaskModel).filter(TaskModel.id == id).first()
    db.delete(task)
    db.commit()
    return True
