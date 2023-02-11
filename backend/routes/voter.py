from flask import Blueprint, request, jsonify, current_app as app
from werkzeug.utils import secure_filename
import os 
import face_recognition
import urllib.request as ur
import generateEmbedding 
import json

ALLOWED_UPLOAD_EXTENSIONS = [".jpg", ".jpeg", ".png"]
VOTER_IMAGE_DATABASE_NAME = "voter" 

voter_info_api = Blueprint('voter_info_route', __name__, url_prefix="/voter")

@voter_info_api.route("/upload/voterDetails", methods = ["POST"])
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

@voter_info_api.route("/imageProcess", methods = ["POST"])
def process():
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
        return jsonify(success=True, result="Result of face recognition model")