from pymongo import MongoClient
from core.config import config

client = MongoClient(config.MONGO_URL)

db = client.query

print(db.users.count_documents({}))
