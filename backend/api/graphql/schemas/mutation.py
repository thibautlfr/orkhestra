import strawberry
from api.graphql.resolvers.project import create_project, update_project, delete_project
from api.graphql.resolvers.user import (
    create_user,
    update_user,
    delete_user,
    signup,
    login,
)
from api.graphql.resolvers.task import create_task, update_task, delete_task


@strawberry.type
class Mutation:
    createUser = create_user
    updateUser = update_user
    deleteUser = delete_user
    signup = signup
    login = login

    createProject = create_project
    updateProject = update_project
    deleteProject = delete_project

    createTask = create_task
    updateTask = update_task
    deleteTask = delete_task
