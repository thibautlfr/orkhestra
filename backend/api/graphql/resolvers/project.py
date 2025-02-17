import strawberry
from database.db import get_db, Session
from api.graphql.types.project import ProjectType
from api.graphql.types.task import TaskType
from database.models import ProjectModel
from api.graphql.types.user import UserType
from fastapi import HTTPException

from typing import List


@strawberry.field
def get_projects() -> List[ProjectType]:
    db = next(get_db())
    projects = db.query(ProjectModel).all()
    return [
        ProjectType(
            id=project.id,
            title=project.title,
            description=project.description,
            owner_id=project.owner_id,
            tasks=[
                TaskType(
                    id=task.id,
                    title=task.title,
                    status=task.status,
                    project_id=task.project_id,
                )
                for task in project.tasks
            ],
        )
        for project in projects
    ]


@strawberry.field
def get_project(id: int) -> ProjectType:
    db = next(get_db())
    project = db.query(ProjectModel).filter(ProjectModel.id == id).first()
    return ProjectType(
        id=project.id,
        title=project.title,
        description=project.description,
        owner_id=project.owner_id,
        tasks=[
            TaskType(
                id=task.id,
                title=task.title,
                status=task.status,
                project_id=task.project_id,
            )
            for task in project.tasks
        ],
    )


@strawberry.mutation
def create_project(title: str, description: str, owner_id: int) -> ProjectType:
    db = next(get_db())
    project = ProjectModel(title=title, description=description, owner_id=owner_id)
    db.add(project)
    db.commit()
    return ProjectType(
        id=project.id,
        title=project.title,
        description=project.description,
        owner_id=project.owner_id,
        tasks=[],
    )


@strawberry.mutation
def update_project(id: int, title: str, description: str, owner_id: int) -> ProjectType:
    db = next(get_db())
    project = db.query(ProjectModel).filter(ProjectModel.id == id).first()
    project.title = title
    project.description = description
    project.owner_id = owner_id
    db.commit()
    return ProjectType(
        id=project.id,
        title=project.title,
        description=project.description,
        tasks=[
            TaskType(
                id=task.id,
                title=task.title,
                status=task.status,
                project_id=task.project_id,
            )
            for task in project.tasks
        ],
    )


# @strawberry.mutation
# def delete_project(id: int) -> bool:
#     db = next(get_db())
#     project = db.query(ProjectModel).filter(ProjectModel.id == id).first()
#     db.delete(project)
#     db.commit()
#     return True


@strawberry.mutation
def delete_project(info: strawberry.Info, id: int) -> bool:
    db = next(get_db())

    if not info.context.user:
        raise HTTPException(status_code=401, detail="Authentication required")

    user_id = info.context.user["user_id"]

    project = db.query(ProjectModel).filter(ProjectModel.id == id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    user_id = info.context.user["user_id"]
    if project.owner_id != user_id:
        raise HTTPException(status_code=403, detail="Permission denied")

    db.delete(project)
    db.commit()
    return True
