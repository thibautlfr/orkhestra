import uvicorn
import strawberry
from fastapi import FastAPI
from strawberry.fastapi import GraphQLRouter
from api.graphql.schemas.query import Query
from api.graphql.schemas.mutation import Mutation
from api.graphql.middlewares.auth import custom_context_dependency
from fastapi.middleware.cors import CORSMiddleware

schema = strawberry.Schema(query=Query, mutation=Mutation)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

graphql_app = GraphQLRouter(schema, context_getter=custom_context_dependency)
app.include_router(graphql_app, prefix="/graphql")

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
