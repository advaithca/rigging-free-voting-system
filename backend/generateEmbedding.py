import face_recognition
import pymongo

def generate(images:list, labels:list, database:str):    
    '''
    Generates Embeddings for each image in the images list, and saves them to a database.
    
    images[list]: contains list of images, or path to images
    labels[list]: contains corresponding labels for images in images[list]
    database[str]: name of the database
    '''

    labelsEmbeddingsMap = dict()
    for image, label in zip(images,labels):
        img = face_recognition.load_image_file(image)
        faces = face_recognition.face_encodings(img)
        if len(faces) == 0:
            raise Exception("No faces detected in image")
        elif len(faces) > 1:
            raise Exception("Multiple faces detected in image")
        else: 
            encoding = face_recognition.face_encodings(img)[0]
            if label not in labelsEmbeddingsMap:
                labelsEmbeddingsMap[label] = [encoding]
            else:
                labelsEmbeddingsMap[label].append(encoding)

    client = pymongo.MongoClient(
        "mongodb+srv://majorproject:majorproject@cluster0.ktbjam0.mongodb.net/?retryWrites=true&w=majority"
    )
    
    db = client[database]
    coll = db["imageEmbeddings"]
    toInsert = []
    for label, encodings in labelsEmbeddingsMap.items():
        for encoding in encodings:
            toInsert.append({
                "label":label,
                "embedding":[float(numpy_value) for numpy_value in encoding]
            })
    coll.insert_many(toInsert)