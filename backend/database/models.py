from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database.db import Base
from sqlalchemy import ForeignKey


class UserModel(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String(50), nullable=False)
    password = Column(String(30), nullable=False)
    role = Column(String(30), nullable=False)
    projects = relationship(
        "ProjectModel", cascade="all, delete-orphan", back_populates="owner"
    )


class ProjectModel(Base):
    __tablename__ = "projects"

    id: int = Column(Integer, primary_key=True, index=True)
    title: str = Column(String(30), nullable=False)
    description: str = Column(String(100), nullable=False)
    owner_id: int = Column(Integer, ForeignKey("users.id"), nullable=False)
    owner = relationship("UserModel", cascade="all, delete", back_populates="projects")
    tasks = relationship(
        "TaskModel", cascade="all, delete-orphan", back_populates="project"
    )


class TaskModel(Base):
    __tablename__ = "tasks"

    id: int = Column(Integer, primary_key=True)
    title: str = Column(String(30), nullable=False)
    status: str = Column(String(30), nullable=False)
    project_id: int = Column(Integer, ForeignKey("projects.id"), nullable=False)
    project = relationship("ProjectModel", back_populates="tasks")
