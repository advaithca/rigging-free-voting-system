from flask import Flask
import os
from routes.voter import voter_info_api
from flask_cors import CORS

PORT = 5000
FOLDER_NAME = "backend"
INSTANCE_PATH = os.path.join(os.path.abspath(
    os.curdir), FOLDER_NAME, "instance")

app = Flask(__name__)
CORS(app)

app.register_blueprint(voter_info_api)

@app.route("/", methods=["GET"])
def index():
    return "Hello world"

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=PORT, debug=True)
