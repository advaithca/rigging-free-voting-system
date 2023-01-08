from flask import Blueprint, request, jsonify, current_app as app
from werkzeug.utils import secure_filename
import os 
import generateEmbedding 

ALLOWED_UPLOAD_EXTENSIONS = [".jpg", ".jpeg", ".png"]
VOTER_IMAGE_DATABASE_NAME = "voter" 

voter_info_api = Blueprint('voter_info_route', __name__)

@voter_info_api.route("/upload/voterDetails", methods = ["POST"])
def upload():
    label = request.form.get("label")
    print(f"The label obtained from the frontend is: {label}")

    uploaded_image = request.files.get("photo")
    if uploaded_image.filename != "":
        file_ext = os.path.splitext(uploaded_image.filename)[1]
        if file_ext not in ALLOWED_UPLOAD_EXTENSIONS:
            return jsonify(success=False, error="File extension not allowed! Only JPEG and PNG files are allowed")

        if not os.path.exists(app.instance_path):
            os.mkdir(app.instance_path)
        uploaded_image_path = os.path.join(app.instance_path, secure_filename(uploaded_image.filename))
        uploaded_image.save(uploaded_image_path) 
        generateEmbedding.generate([uploaded_image_path], [label], VOTER_IMAGE_DATABASE_NAME)
        os.remove(uploaded_image_path) 
        return jsonify(success=True)
    else:
        return jsonify(success=False, error="File not uploaded properly!")

