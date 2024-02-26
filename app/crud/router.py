from fastapi import APIRouter, HTTPException, Depends, Header
from app.auth.dependenies import get_current_user
from pydantic import BaseModel, Field

from database.asyncDB import userBaseModel
from typing import List
from datetime import datetime
import json
from bson import ObjectId





class CreateBody(BaseModel):
    data : dict


class UpdateBody(BaseModel):
    filterValue : dict
    value : dict



column_data_types = {
    'User ID': "intiger",
    'Subscription Type': "string",
    'Monthly Revenue': "float",
    'Join Date': "string", 
    'Last Payment Date': "string", 
    'Country': "string",
    'Age': "intiger",
    'Gender': "string",
    'Device': "string",
    'Plan Duration': "string"
}

def get_model_fields(model: BaseModel) -> List[str]:

    lis = list(model.__annotations__.keys())
    print(lis)
    return lis


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

@crudRouter.get('/crud/{user_id}')

async def getdata( user_id = int, user: dict = Depends(get_current_user)):
    try:
        # Query the database for the user with the given user_id
        cursor = await userBaseModel.find_one({"User ID": int(user_id)})
        if cursor  and cursor['_id']:
            cursor['_id'] = str(cursor['_id'])
            
        if cursor:
            return {"data" : cursor}
        else:
            return {"message": "User not found"}
    except :
        return {"error": "An error occurred:"}


@crudRouter.put('/crud')

async def updateData(value : UpdateBody, user : dict = Depends(get_current_user)):
    filter_data = value.filterValue
    update_data = value.value
    filter_data["User ID"] = int(filter_data["User ID"])

    result = await userBaseModel.update_one(filter_data, {"$set": update_data})

    print(result)


    if result.modified_count == 1:
        return {"message": "Document updated successfully"}
    else:
        raise HTTPException(status_code=404, detail="Document not found")
    


@crudRouter.post('/crud')

async def updateData(value : CreateBody, user : dict = Depends(get_current_user)):
    data = value.data

    result = await userBaseModel.insert_one(data)
    print(result.acknowledged)

    if result.acknowledged:
        return {"message" : "Document is successfully inserted"}
    else:
        raise HTTPException(status_code=400, detail="Faild to insert a ducument")
    

@crudRouter.delete('/crud/{record_id}')
async def delete_record(record_id: str, user : dict = Depends(get_current_user)):
    print(record_id)
    try:
        # Convert string to ObjectId
        obj_id = ObjectId(record_id)
        print(obj_id)
        
        # Check if record with given ID exists
        if userBaseModel.find_one({"_id": obj_id}):
            # Delete the record
            result = await userBaseModel.delete_one({"_id": obj_id})
            return {"message": f"Record deleted successfully"}
        else:
            raise HTTPException(status_code=404, detail=f"Record with ID {record_id} not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

   


@crudRouter.get('/cols')
async def getcols(user: dict = Depends(get_current_user)):
    return column_data_types




    

