from fastapi import HTTPException, Depends, status, Header
from app.auth.router import oauth_schema
import jwt


from core.config import config
from database.db import userModel



async def get_current_user(token: str = Depends(oauth_schema)):
    # print(authorization)
    # if authorization is None or not authorization.startswith("Bearer "):
    #     raise HTTPException(status_code=401, detail="Invalid authorization header")
    
    # token = authorization.split("Bearer ")[1]

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid authentication credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, config.JWT_SECRET_KEY, algorithms=[config.JWT_ALGORITHM])
        print(payload)
        useremail: str = payload.get("email")
        if useremail is None:
            raise credentials_exception
    except :
        raise credentials_exception

    user = userModel.find_one({"email": useremail})
    if user is None:
        raise credentials_exception

    return user