import strawberry
from typing import List
from api.graphql.types.project import ProjectType


@strawberry.type
class UserType:
    id: int
    username: str
    password: str
    email: str
    role: str
    projects: List[ProjectType]
