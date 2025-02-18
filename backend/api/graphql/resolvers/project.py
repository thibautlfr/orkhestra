import strawberry
from database.db import get_db, Session
from api.graphql.types.project import ProjectType
from api.graphql.types.task import TaskType
from database.models import ProjectModel
from fastapi import HTTPException
from api.graphql.directives.auth import hasRole
from graphql import DirectiveLocation


from typing import List


@strawberry.field
def get_projects(
    info: strawberry.Info, offset: int = 0, limit: int = 10
) -> List[ProjectType]:
    db = info.context.db

    projects = db.query(ProjectModel).offset(offset).limit(limit).all()

    project_ids = [project.id for project in projects]
    tasks_by_project = info.context.task_loader.load_tasks(project_ids)

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
                for task in tasks_by_project[i]
            ],
        )
        for i, project in enumerate(projects)
    ]


@strawberry.field
def get_project(info: strawberry.Info, id: int) -> ProjectType:
    db = info.context.db

    project = db.query(ProjectModel).filter(ProjectModel.id == id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    tasks = info.context.task_loader.load(project.id)

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
            for task in tasks
        ],
    )


@strawberry.field
def search_projects(info: strawberry.Info, keyword: str) -> List[ProjectType]:
    db = next(get_db())

    projects = (
        db.query(ProjectModel)
        .filter(
            (ProjectModel.title.ilike(f"%{keyword}%"))
            | (ProjectModel.description.ilike(f"%{keyword}%"))
        )
        .all()
    )

    return [
        ProjectType(
            id=project.id,
            title=project.title,
            description=project.description,
            owner_id=project.owner_id,
            tasks=[],
        )
        for project in projects
    ]


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


@strawberry.mutation
def delete_project(info: strawberry.Info, id: int) -> bool:
    if not hasRole(info, "ADMIN"):
        raise HTTPException(status_code=403, detail="Permission denied")

    db = info.context.db

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
