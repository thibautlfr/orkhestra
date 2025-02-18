import strawberry
from api.graphql.resolvers.project import get_projects, get_project, search_projects
from api.graphql.resolvers.user import get_users, get_user
from api.graphql.resolvers.task import get_tasks, get_task, tasks_by_status


@strawberry.type
class Query:
    getUsers = get_users
    getUser = get_user

    searchProjects = search_projects
    getProjects = get_projects
    getProject = get_project

    getTasks = get_tasks
    getTask = get_task
    tasksByStatus = tasks_by_status
