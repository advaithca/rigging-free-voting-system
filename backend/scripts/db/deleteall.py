from pymongo import MongoClient, DeleteMany

client = MongoClient("mongodb+srv://majorproject:majorproject@cluster0.ktbjam0.mongodb.net/?retryWrites=true&w=majority")
db = client.voter
collection = db.imageEmbeddings
requesting = []
requesting.append(DeleteMany({}))

result = collection.bulk_write(requesting)
client.close()