import strawberry
from typing import List
from api.graphql.types.project import ProjectType


@strawberry.type
class UserType:
    id: int
    email: str
    password: str
    role: str
    projects: List[ProjectType]
