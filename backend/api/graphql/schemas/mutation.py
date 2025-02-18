import strawberry
from api.graphql.resolvers.project import create_project, delete_project
from api.graphql.resolvers.user import (
    delete_user,
    signup,
    login,
)
from api.graphql.resolvers.task import create_task, delete_task


@strawberry.type
class Mutation:
    signup = signup
    login = login

    deleteUser = delete_user

    createProject = create_project
    deleteProject = delete_project

    createTask = create_task
    delete_task = delete_task
