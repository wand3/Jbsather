# from fastapi import APIRouter, Depends, HTTPException, status, Query
# from datetime import timedelta
# from typing import Annotated, Union
# from fastapi.security import OAuth2PasswordRequestForm
# from starlette.responses import JSONResponse
# from sqlalchemy.ext.asyncio import AsyncSession
# from app.schemas.auth import Token
# from app.schemas.user import UserBase, UserCreate, UserInDB
# from app.models.user import UserModel
# from app.database.db_engine import get_session
# from app.services.user_services import get_user_by_username, get_user_by_id, get_user_by_email, create_user
# from app.security import authenticate_user, create_access_token
# from app.logger import logger
# from ..config import Config
# from sqlalchemy import select
# from ..dependencies import get_current_active_user

# auth = APIRouter(tags=["Auth"])


# async def get_user_model(
#     db: Annotated[AsyncSession, Depends(get_session)],
# ) -> UserModel:
#     """
#     Dependency that provides access to the UserModel bound to a database session.
#     You can call this to perform queries inside routes or other dependencies.
#     """
#     # You can attach the db session dynamically if needed
#     UserModel.session = db
#     return UserModel


