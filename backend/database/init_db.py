from database.models import *
from database.db import Base, engine

Base.metadata.create_all(engine)
