import pandas as pd
from pymongo import MongoClient

# Read the CSV file
data = pd.read_csv(r'c:\study\mongod\database\netflix_userbase.csv')

# Connect to MongoDB
client = MongoClient('mongodb+srv://balaji:balaji@cluster0.zgkm2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client['query']  # Specify your database name
collection = db['userbase']  # Specify uyour collection name

# Convert the data to dictionary format and insert into MongoDB
data_dict = data.to_dict(orient='records')
collection.insert_many(data_dict)

print("Data imported successfully into MongoDB.")