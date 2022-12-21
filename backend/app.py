from flask import Flask

app = Flask(__name__)

PORT = 5000

@app.route("/")
def index():
    return "Welcome to the backend of the rigging free voting system"

if __name__ == '__main__':
    app.run(port=PORT, debug=True)