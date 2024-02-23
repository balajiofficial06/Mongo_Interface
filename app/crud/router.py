from fastapi import APIRouter, HTTPException, Depends, Header
from app.auth.dependenies import get_current_user


crudRouter = APIRouter()

@crudRouter.get('/crud')

async def getdata(user: dict = Depends(get_current_user)):
    # print(Authorization)

    return {"user": "route"}


