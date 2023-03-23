FROM python:3.9.13

WORKDIR /app

# Install app dependencies
COPY requirements.txt ./

RUN apt-get update && apt-get install -y cmake
RUN pip install -r requirements.txt

# Bundle app source
COPY . .

EXPOSE 5000
# CMD [ "flask", "run","--host","0.0.0.0","--port","5000","--cert","cert.pem","--key","key.pem"]
ENTRYPOINT [ "gunicorn --certfile cert.pem --keyfile key.pem -b 0.0.0.0:5000 app:app" ]