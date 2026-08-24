import os

from dotenv import load_dotenv
from flask import Flask
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

from configs import db
from models import User, Property, Favorite

load_dotenv()

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


db.init_app(app)
migrate = Migrate(app, db)


@app.route("/")
def home():
    return {"message": "Nairobi House Hunt API is running!"}


if __name__ == "__main__":
    app.run(debug=True)