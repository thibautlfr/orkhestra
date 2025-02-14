import uvicorn
from fastapi import FastAPI
from strawberry.fastapi import GraphQLRouter
from api.schema import schema

app = FastAPI()

graphql_app = GraphQLRouter(schema)
app.include_router(graphql_app, prefix="/graphql")

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)