import strawberry
from database.db import get_db, Session
from api.graphql.types.project import ProjectType
from api.graphql.types.task import TaskType
from database.models import ProjectModel
from api.graphql.types.user import UserType

from typing import List


@strawberry.field
def get_projects() -> List[ProjectType]:
    db = next(get_db())
    projects = db.query(ProjectModel).all()
    return [
        ProjectType(
            id=project.id,
            name=project.name,
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
        name=project.name,
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
def create_project(name: str, description: str, owner_id: int) -> ProjectType:
    db = next(get_db())
    project = ProjectModel(name=name, description=description, owner_id=owner_id)
    db.add(project)
    db.commit()
    return ProjectType(
        id=project.id, name=project.name, description=project.description, tasks=[]
    )


@strawberry.mutation
def update_project(id: int, name: str, description: str, owner_id: int) -> ProjectType:
    db = next(get_db())
    project = db.query(ProjectModel).filter(ProjectModel.id == id).first()
    project.name = name
    project.description = description
    project.owner_id = owner_id
    db.commit()
    return ProjectType(
        id=project.id,
        name=project.name,
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


@strawberry.mutation
def delete_project(id: int) -> bool:
    db = next(get_db())
    project = db.query(ProjectModel).filter(ProjectModel.id == id).first()
    db.delete(project)
    db.commit()
    return True
