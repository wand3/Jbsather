from typing import List, Annotated
from ..logger import logger
from fastapi import APIRouter, Depends, HTTPException, status, Query

main = APIRouter()

@main.get("/")
async def index():
    return {"message": "Hello World welcome to Jbsather"}
