import uvicorn
import strawberry
from fastapi import FastAPI
from strawberry.fastapi import GraphQLRouter
from api.graphql.schemas.query import Query
from api.graphql.schemas.mutation import Mutation

schema = strawberry.Schema(query=Query, mutation=Mutation)

app = FastAPI()
graphql_app = GraphQLRouter(schema)
app.include_router(graphql_app, prefix="/graphql")

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
