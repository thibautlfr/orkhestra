import strawberry
from api.queries import Query

schema = strawberry.Schema(query=Query)