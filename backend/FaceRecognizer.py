import pandas as pd
from sklearn.svm import SVC
from sklearn.decomposition import PCA as RandomizedPCA
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

class FaceRecognizer():
    def __init__(self,data):
        '''
        Initialise the Object with face data

        data: Pymongo document cursor
        '''
        self.faceData = pd.DataFrame(list(data.find()))

        self.X = self.faceData['embeddings']
        self.y = self.faceData['labels']
    
    def make_model(self):
        pca = RandomizedPCA(n_components=150, whiten=True, random_state=42)
        svc = SVC(kernel='rbf', class_weight='balanced')
        self.model = make_pipeline(pca, svc)
    
    def train(self):
        self.X_train, self.X_test, self.y_train, self.y_test = train_test_split(self.X, self.y, test_size=0.4, random_state=42)
        
        self.model.fit(self.X_train, self.y_train)

    def test(self):
        predictions = self.model.predict(self.X_test)
        accuracy_score(predictions, self.y_test)