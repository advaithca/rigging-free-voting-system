import json
import os 
from pymongo import MongoClient, InsertOne

client = MongoClient("mongodb+srv://majorproject:majorproject@cluster0.ktbjam0.mongodb.net/?retryWrites=true&w=majority")
db = client.voter
collection = db.imageEmbeddings
requesting = []

with open(os.path.join(os.getcwd(), "jsontest.json")) as f:
    json_data = json.load(f)
    #print(json_data)
    for jsonObjDict in json_data:
        jsonObjDict["_id"]["oid"] = jsonObjDict["_id"]["$oid"]
        del jsonObjDict["_id"]["$oid"]
        print(jsonObjDict)
        requesting.append(InsertOne(jsonObjDict))

result = collection.bulk_write(requesting)
client.close()