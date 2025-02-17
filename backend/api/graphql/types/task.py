import strawberry


@strawberry.type
class TaskType:
    id: int
    title: str
    status: str
    project_id: int
