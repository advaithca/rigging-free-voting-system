from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os 

PORT = 5000
FOLDER_NAME = "backend"
INSTANCE_PATH = os.path.join(os.path.abspath(os.curdir), FOLDER_NAME, "instance")

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
        if not os.path.exists(app.instance_path):
            os.mkdir(app.instance_path)
        uploaded_image_path = os.path.join(app.instance_path, secure_filename(uploaded_image.filename))
        uploaded_image.save(uploaded_image_path)
    return jsonify(success=True)

if __name__ == '__main__':
    app.run(port=PORT, debug=True)

