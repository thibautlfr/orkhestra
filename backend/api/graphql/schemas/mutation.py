import strawberry
from api.graphql.resolvers.project import create_project, update_project, delete_project
from api.graphql.resolvers.user import (
    delete_user,
    signup,
    login,
)
from api.graphql.resolvers.task import create_task, update_task, delete_task


@strawberry.type
class Mutation:
    signup = signup
    login = login

    deleteUser = delete_user

    createProject = create_project
    updateProject = update_project
    deleteProject = delete_project

    createTask = create_task
    updateTask = update_task
    deleteTask = delete_task
