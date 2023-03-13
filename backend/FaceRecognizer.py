import pandas as pd
from sklearn.svm import SVC
from sklearn.decomposition import PCA as RandomizedPCA
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import numpy as np 
import pymongo as pm

class FaceRecognizer():
    def __init__(self,data):
        '''
        Initialise the Object with face data

        data: Pymongo document cursor
        '''
        self.faceData = pd.DataFrame(list(data.find()))

        embedding =  self.faceData['embedding']
        embedding_data = np.array([np.array(x) for x in embedding])
        self.X = embedding_data                  
        self.y = self.faceData['label']

    
    def make_model(self):
        pca = RandomizedPCA(n_components=40, whiten=True, random_state=42)
        svc = SVC(kernel='rbf', class_weight='balanced')
        self.model = make_pipeline(pca, svc)
    
    def train(self):
        self.X_train, self.X_test, self.y_train, self.y_test = train_test_split(self.X, self.y, test_size=0.4, random_state=42)
        self.model.fit(self.X_train, self.y_train)

    def test(self):
        predictions = self.model.predict(self.X_test)
        self.score = accuracy_score(predictions, self.y_test)
    
    def update(self, x, y):
        self.model.fit(x, y)

    def get_prediction(self, data):
        return self.model.predict(data) 
    
def validateVoter(name:str):
    '''
    Returns whether a voter of given name is Valid or Not
    '''
    connection = pm.MongoClient(
        "mongodb+srv://majorproject:majorproject@cluster0.ktbjam0.mongodb.net/?retryWrites=true&w=majority"
    )
    db = connection['voterDetails']
    coll = db['Details']
    query = {"name":name}

    doc_count = coll.count_documents(query)
    print(doc_count)
    if doc_count == 0:
        coll.insert_one({
            "name": name
        })
        return True
    else:
        return False