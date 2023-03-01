import pymongo

def getCursor(DB_URL, collectionName, databaseName):
    client = pymongo.MongoClient(DB_URL)
    
    db = client[databaseName]
    coll = db[collectionName]

    return coll