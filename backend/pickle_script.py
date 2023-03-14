from joblib import dump
import sys
from pymongo import MongoClient

from FaceRecognizer import FaceRecognizer

VOTER_IMAGE_DATABASE_NAME = "voter" 
DB_URL = "mongodb+srv://majorproject:majorproject@cluster0.ktbjam0.mongodb.net/?retryWrites=true&w=majority"
collectionNameForImageData = "imageEmbeddings"

client = MongoClient(DB_URL)
cursor = client[VOTER_IMAGE_DATABASE_NAME][collectionNameForImageData]
svm = FaceRecognizer(cursor)

svm.make_model()
svm.train()

dump(svm, 'svm.joblib')

