import os
from fastapi import FastAPI
# from .routes import auth_router, user_router
from .logger import logger
# from .database import lifespan # Ensure you have a lifespan handler defined somewhere!

def create_app() -> FastAPI:
    logger.info('Application is starting -----------')
    
    # Changed 'db_lifespan' to 'lifespan' (Standard FastAPI)
    # If you haven't defined a lifespan context manager yet, remove this argument
    app = FastAPI() 
    
    logger.info(f'Application started -----------')
    
    # Include routes
    # app.include_router(auth_router)
    # app.include_router(user_router)

    return app

app = create_app()