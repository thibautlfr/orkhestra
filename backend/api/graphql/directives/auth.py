from graphql import DirectiveLocation
import strawberry
from strawberry.types import Info
from fastapi import HTTPException


def hasRole(info: Info, role: str) -> bool:
    if not info.context.user:
        raise HTTPException(status_code=401, detail="Authentication required")

    if info.context.user["role"] != role:
        raise HTTPException(status_code=403, detail="Forbidden")

    return True
