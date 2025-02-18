import strawberry
from api.graphql.resolvers.project import get_projects, get_project, search_projects


@strawberry.type
class Query:
    searchProjects = search_projects
    getProjects = get_projects
    getProject = get_project
