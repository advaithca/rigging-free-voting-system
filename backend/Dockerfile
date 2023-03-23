FROM python:3.9.13

ENV APP_HOME /backend
WORKDIR $APP_HOME

COPY . /backend

RUN apt-get update && apt-get install -y cmake
RUN pip install -r requirements.txt

ENTRYPOINT ["python app.py"]