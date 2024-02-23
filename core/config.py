from pydantic_settings import BaseSettings
import os
from datetime import datetime, timedelta



class Config(BaseSettings):
    ENV: str = "development"
    DEBUG: bool = True
    APP_HOST: str = "0.0.0.0"
    APP_PORT: int = 8000
    MONGO_URL: str = "mongodb+srv://balaji:balaji@cluster0.zgkm2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    JWT_SECRET_KEY: str = "fastapi"
    JWT_ALGORITHM: str = "HS256"
    JWT_EXP: int = 30




config = Config()