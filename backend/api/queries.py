from typing import List
import strawberry
from api.schemas.user import User
from api.schemas.project import Project
from api.schemas.task import Task
from database.memory_db import users, projects, tasks

@strawberry.type
class Query:
    @strawberry.field
    def get_users(self) -> List[User]:
        return users

    @strawberry.field
    def get_projects(self) -> List[Project]:
        return projects

    @strawberry.field
    def get_tasks(self) -> List[Task]:
        return tasks