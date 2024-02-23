from pymongo import MongoClient
from core.config import config
from motor.motor_asyncio import AsyncIOMotorClient


client = AsyncIOMotorClient(config.MONGO_URL)


db = client.query

userModel = db.users
userBaseModel = db.userbase
