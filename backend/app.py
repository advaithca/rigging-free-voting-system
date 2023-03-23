from flask import Flask, request, jsonify
import os
from routes.voter import voter_info_api
#from flask_cors import CORS  

PORT = 5000
FOLDER_NAME = "backend"
INSTANCE_PATH = os.path.join(os.path.abspath(
    os.curdir), FOLDER_NAME, "instance")

app = Flask(__name__, instance_path=INSTANCE_PATH)
"""CORS(app,
     resources={r'/*': {'origins': '*'}},
     supports_credentials=True
     )"""  # comment this on deployment

#CORS(app, origins=["http:localhost:3000"])
app.register_blueprint(voter_info_api)

@app.route("/", methods=["GET"])
def index():
    print(request)
    return jsonify(success=True)


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=PORT)
