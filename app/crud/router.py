from fastapi import APIRouter, HTTPException, Depends, Header
from app.auth.dependenies import get_current_user

from database.asyncDB import userBaseModel
from typing import List



crudRouter = APIRouter()
async def remove_id_from_data(data: List[dict]):
    for item in data:
        if '_id' in item:
            del item['_id']
    return data
@crudRouter.get('/crud')

async def getdata(skip: int = 0, limit : int = 10, user: dict = Depends(get_current_user)):

    cursor = userBaseModel.find().skip(skip).limit(limit)
    data = await cursor.to_list(length=limit)
    return await remove_id_from_data(data)


