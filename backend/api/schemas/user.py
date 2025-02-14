from typing import List, Optional
import strawberry
from api.schemas.project import Project

@strawberry.type
class User:
    id: int
    username: str
    email: str
    projects: List[Project] = strawberry.field(default_factory=list)