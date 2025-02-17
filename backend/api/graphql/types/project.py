import strawberry
from typing import List
from api.graphql.types.task import TaskType


@strawberry.type
class ProjectType:
    id: int
    name: str
    description: str
    owner_id: int
    tasks: List[TaskType]
