from flask import Flask, request, jsonify
import os 
from routes.voter import voter_info_api
import datetime

x = datetime.datetime.now()

PORT = 5000
FOLDER_NAME = "backend"
INSTANCE_PATH = os.path.join(os.path.abspath(os.curdir), FOLDER_NAME, "instance")

app = Flask(__name__, instance_path=INSTANCE_PATH)
app.register_blueprint(voter_info_api, url_prefix="/voter")

@app.route("/", methods = ["GET"])
def index():
    print(request)
    return jsonify(success=True)

@app.route('/data')
def get_time():
  
    # Returning an api for showing in  reactjs
    return {
        'Name':"geek", 
        "Age":"22",
        "Date":x, 
        "programming":"python"
        }

if __name__ == '__main__':
    app.run(port=PORT, debug=True)
