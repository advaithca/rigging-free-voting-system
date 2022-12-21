from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os 

PORT = 5000
FOLDER_NAME = "backend"
INSTANCE_PATH = os.path.join(os.path.abspath(os.curdir), FOLDER_NAME, "instance")
ALLOWED_UPLOAD_EXTENSIONS = [".jpg", ".jpeg", ".png"]

app = Flask(__name__, instance_path=INSTANCE_PATH)

@app.route("/", methods = ["GET"])
def index():
    print(request)
    return jsonify(success=True)

@app.route("/upload/voterdetails", methods = ["POST"])
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
        # os.remove(uploaded_image_path) - To be uncommented once embedding is done
        return jsonify(success=True)
    else:
        return jsonify(success=False, error="File not uploaded properly!")

if __name__ == '__main__':
    app.run(port=PORT, debug=True)

