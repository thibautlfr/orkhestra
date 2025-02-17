import strawberry
from typing import List
from api.graphql.types.task import TaskType


@strawberry.type
class ProjectType:
    id: int
    title: str
    description: str
    owner_id: int
    tasks: List[TaskType]
