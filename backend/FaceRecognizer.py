import pandas as pd
from pymongo import MongoClient
from sklearn.decomposition import PCA
from sklearn.svm import SVC
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split

class FaceRecognizer:
    def __init__(self, collection):
        '''
        Takes a MongoDB cursor as input and initialises Data for training
        '''
        data = []
        for record in collection.find():
            data.append(record)
        df = pd.DataFrame(data)
        for i in range(128):
            df[i] = 0
        for row in df.itertuples():
            for i in range(len(row[3])):
                df.loc[row[0],i] = row[3][i]
        df.drop(['_id', 'embedding'], axis=1, inplace=True)

        self.X = df.drop('label', axis=1)
        self.y = df['label']

    def make_model(self):
        '''
        Makes the model pipeline with PCA and SVM
        '''
        pipeline = Pipeline([
            ('pca', PCA(n_components=32)),
            ('svm', SVC(probability=True))
        ])
        self.model = pipeline

    def train(self):
        '''
        Trains the Face Recognition Model
        '''
        X_train, self.X_test, y_train, self.y_test = train_test_split(self.X, self.y, test_size=0.2, random_state=42)
        self.model.fit(X_train, y_train)

    def test(self):
        '''
        Storing Accuracy score
        '''
        accuracy = self.model.score(self.X_test, self.y_test)
        self.score = accuracy
    
    def update(self, x, y):
        '''
        If model is already present, it trains it on new data.
        '''
        self.model.fit(x, y)

    def get_prediction(self, data, threshold):
        '''
        Get Predicted labels, default is unknown. If Probability greater than Threshold value, it gets saved.
        '''
        predictedName = "unknown"
        predictedProbabilities = self.model.predict_proba(data)

        for i in range(len(predictedProbabilities[0])):
            if predictedProbabilities[0][i] > threshold:
                predictedName = self.model.classes_[i]
                break
        print(predictedProbabilities, self.model.classes_)
        return predictedName

def validateVoter(name:str):
    '''
    Returns whether a voter of given name is Valid or Not
    '''
    if name.lower() == "unknown":
        return False

    connection = MongoClient(
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