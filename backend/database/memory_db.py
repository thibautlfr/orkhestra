from api.schemas.user import User
from api.schemas.project import Project
from api.schemas.task import Task

# Simule une base de données en mémoire
users = [
    User(id=1, username="thibaut", email="thibaut@example.com", projects=[])
]

projects = [
    Project(id=1, name="Projet GraphQL", description="Workshop sur GraphQL", tasks=[])
]

tasks = [
    Task(id=1, title="Configurer FastAPI", description="Initialiser FastAPI avec Strawberry", completed=False)
]