from flask import Blueprint, request, jsonify, current_app as app
from werkzeug.utils import secure_filename
import os 
import face_recognition
import urllib.request as ur
import generateEmbedding 
import json
from FaceRecognizer import FaceRecognizer, validateVoter
from getEmbeddings import getCursor
from joblib import dump, load
import pymongo
from flask_cors import cross_origin

ALLOWED_UPLOAD_EXTENSIONS = [".jpg", ".jpeg", ".png"]
VOTER_IMAGE_DATABASE_NAME = "voter" 
DB_URL = "mongodb+srv://majorproject:majorproject@cluster0.ktbjam0.mongodb.net/?retryWrites=true&w=majority"
collectionNameForImageData = "imageEmbeddings"

voter_info_api = Blueprint('voter_info_route', __name__, url_prefix="/voter")

@voter_info_api.route("/setPasscode", methods = ["POST"], endpoint='setPasscode')
@cross_origin
def setPasscode():
    passcode = request.form.get("code")

    try:
        client = pymongo.MongoClient(
        "mongodb+srv://majorproject:majorproject@cluster0.ktbjam0.mongodb.net/?retryWrites=true&w=majority"
        )
        coll = client["voter"]["passcode"]
        coll.update_one({}, {"$set": {"passcode": passcode}}, upsert=True)
        return jsonify(success=True)
    except Exception as e:
        return jsonify(success=False, error = str(e))
    
@voter_info_api.route("/getPasscode", methods = ["GET"])
def getPasscode():
    try:
        client = pymongo.MongoClient(
        "mongodb+srv://majorproject:majorproject@cluster0.ktbjam0.mongodb.net/?retryWrites=true&w=majority"
        )
        coll = client["voter"]["passcode"]
        passcode = coll.find_one({}).get("passcode")
        print(passcode)
        response = jsonify(success=True, passcode=passcode)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response
    except Exception as e:
        return jsonify(success=False, error = str(e))


@voter_info_api.route("/upload/voterDetails", methods = ["POST"], endpoint='upload')
@cross_origin
def upload():
    #print(request.form, request.files) # 
    label = request.form.get("label")
    print(f"The label obtained from the frontend is: {label}")

    uploaded_image = request.files.get("photo")
    if uploaded_image.filename != "":
        file_ext = os.path.splitext(uploaded_image.filename)[1]
        if file_ext not in ALLOWED_UPLOAD_EXTENSIONS:
            return jsonify(success=False, error="File extension not allowed! Only JPEG and PNG files are allowed")

        if not os.path.exists(app.instance_path):
            os.makedirs(app.instance_path)
        uploaded_image_path = os.path.join(app.instance_path, secure_filename(uploaded_image.filename))
        uploaded_image.save(uploaded_image_path)  
        try: 
            generateEmbedding.generate([uploaded_image_path], [label], VOTER_IMAGE_DATABASE_NAME)
            return jsonify(success=True)
        except Exception as e:
            return jsonify(success=False, error = str(e))
        finally:
            os.remove(uploaded_image_path) 
    else:
        return jsonify(success=False, error="File not uploaded properly!")

@voter_info_api.route("/imageProcess", methods = ["POST"],endpoint='process')
@cross_origin
def process():
    pickle_path = os.path.join(os.getcwd(), "svm.joblib") # assuming run from main directory of whole project
    if not os.path.exists(pickle_path):
        print(pickle_path)
        return jsonify(success = False, error="No ML model up! Kindly train model") 

    base64 = json.loads(request.data).get("base64")
    decoded_image = ur.urlopen(base64)
    image_loaded = face_recognition.load_image_file(decoded_image)
    faces = face_recognition.face_encodings(image_loaded)
    if len(faces) == 0:
        return jsonify(success=False, error="No faces detected in image")
    elif len(faces) > 1:
        return jsonify(success=False, error="Multiple faces detected in image")
    else: 
        print("The embedding generated is ", faces[0])
        """
        Returning prediction
        """
        model = load(pickle_path)
        res = model.get_prediction(faces,threshold=0.5)
        ans = validateVoter(str(res))
        if ans:
            result = "Valid voter"
        else:
            result = "Invalid voter"

        return jsonify(success=True, result=f"Result of face recognition model {str(res)}. {result}", validity=ans)

@voter_info_api.route("/train", methods = ["POST"],endpoint='trainSVM')
@cross_origin
def trainSVM():
    pickle_path = os.path.join(os.getcwd(), "svm.joblib") # assuming run from main directory of whole project
    if os.path.exists(pickle_path):
        os.remove(pickle_path) # remove old model dump and create new one based on latest data 

    try:
        cursor = getCursor(DB_URL=DB_URL, collectionName=collectionNameForImageData, databaseName="voter")
        svm = FaceRecognizer(cursor)

        svm.make_model()
        svm.train()

        # Once training is done
        svm.test()
        dump(svm, pickle_path)
        return jsonify(success=True,accuracy=svm.score)
    except Exception as e:
        return jsonify(success=False, error = str(e))
    
@voter_info_api.route("/getDetails", methods = ["GET"], endpoint='getVoterDetails')
@cross_origin
def getVoterDetails():
    client = pymongo.MongoClient(
        "mongodb+srv://majorproject:majorproject@cluster0.ktbjam0.mongodb.net/?retryWrites=true&w=majority"
        )
    coll = client["voter"]["imageEmbeddings"]
    result = coll.find()
    aList = []
    for doc in result:
        aList.append([doc['label'],doc['embedding']])
    
    response = jsonify(success=True, data=aList)
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response