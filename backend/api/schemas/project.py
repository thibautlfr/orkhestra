from typing import List, Optional
import strawberry
from api.schemas.task import Task

@strawberry.type
class Project:
    id: int
    name: str
    description: Optional[str] = None
    tasks: List[Task] = strawberry.field(default_factory=list)