import strawberry
from api.graphql.resolvers.project import get_projects, get_project
from api.graphql.resolvers.user import get_users, get_user
from api.graphql.resolvers.task import get_tasks, get_task


@strawberry.type
class Query:
    getUsers = get_users
    getUser = get_user

    getProjects = get_projects
    getProject = get_project

    getTasks = get_tasks
    getTask = get_task
