from configs import db

#User Model
class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column (db.string(128), nullable=False)
    role = db.Column(db.String(20), nullable=False)

    def __repr__(self):
        return f"<User {self.username}>"

#Property Model

class Property(db.Model):
    __tablename__ = "properties"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    currency = db.Column(db.String(10), default="KES")
    location = db.Column(db.String(200), nullable=False)
    county = db.Column(db.String(100), default="Nairobi")
    city = db.Column(db.String(100), default="Nairobi")
    area = db.Column(db.STring(100), nullable=False)
    bedrooms = db.Column(db.Integer, nullable=False)
    bathrooms = db.Column(db.Integer, nullable=False)
    property_type = db.Column(db.String(100), nullable=False)
    description = db.COlumn(db.Text, nullable=False)

class Favorite(db.Model):
    __tablename__ = "favorites"

    id = db.Column(db.Integer, primary_key=True)
    notes = db.Column(db.Text, nullable=True)