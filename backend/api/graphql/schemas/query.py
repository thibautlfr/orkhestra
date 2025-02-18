import strawberry
from api.graphql.resolvers.project import get_projects, get_project


@strawberry.type
class Query:
    getProjects = get_projects
    getProject = get_project
