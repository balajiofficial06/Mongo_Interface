from fastapi import APIRouter, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from passlib.context import CryptContext

import jwt

from datetime import datetime, timedelta



from database.db import db
from core.config import config




router = APIRouter()
userModel = db.users

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class User(BaseModel):
    username : str
    email: str
    fullname : str
    password: str 

class Token(BaseModel):
    access_token: str
    token_type: str

class SignInRequest(BaseModel):
    email : str
    password: str



def generateToken(data: dict):
    encode_data = data.copy()
    encode_data["exp"] = datetime.utcnow() + timedelta(days=config.JWT_EXP)

    token  = jwt.encode(encode_data, config.JWT_SECRET_KEY, algorithm='HS256')
    # decoded_payload = jwt.decode(token , config.JWT_SECRET_KEY, algorithms=['HS256'])

    return token

def hashPassword(password):
    return pwd_context.hash(password)

def getUserByEmail(email):

    user = userModel.find_one({"email": email})
    print(user)
    return user

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)





# generateToken({"name": "balaji"})



@router.post("/login", response_model=Token)

async def login(login_data : User):

    user = getUserByEmail(login_data.email)

    if user:
        raise HTTPException(status_code=409, detail="User with this email already exists")
    else:
        userdata = login_data.model_dump()
        userdata["password"] = hashPassword(login_data.password)
        dbUser = userModel.insert_one(userdata)
        if not dbUser:
            raise HTTPException(status_code=500, detail="Unable to create the user at the moment")
        
        token = generateToken({"email": userdata["email"], "username": userdata["username"]})

        return {"access_token": token, "token_type": "bearer"}
    



@router.post("/signIn", response_model=Token)

async def signIn(request: SignInRequest):

    user = getUserByEmail(request.email)

    if not user:
        raise HTTPException(status_code=404, detail="invalid email id")
    
    if not verify_password(request.password, user["password"]):
        raise HTTPException(status_code=401 ,detail= "Incorrect Password" )
    
    
    token = generateToken({"email": user["email"], "username": user["username"]})

    return {"access_token": token, "token_type": "bearer"}

    