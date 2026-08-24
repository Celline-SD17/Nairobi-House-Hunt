from configs import db

#User Model
class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column (db.String(128), nullable=False)
    role = db.Column(db.String(20), nullable=False)


    properties = db.relationship("Property", back_populates="landlord", cascade="all, delete-orphan")
    favorites = db.relationship("Favorite", back_populates="user", cascade="all, delete-orphan")

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
    area = db.Column(db.String(100), nullable=False)
    bedrooms = db.Column(db.Integer, nullable=False)
    bathrooms = db.Column(db.Integer, nullable=False)
    property_type = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)

    landlord_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    landlord = db.relationship("User", back_populates="properties")
    favorites = db.relationship("Favorite", back_populates="property", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Property {self.title}>"


class Favorite(db.Model):
    __tablename__ = "favorites"

    id = db.Column(db.Integer, primary_key=True)
    notes = db.Column(db.Text, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    property_id =db.Column(db.Integer, db.ForeignKey("properties.id"), nullable=False)

    user = db.relationship("User", back_populates="favorites")
    property = db.relationship("Property", back_populates="favorites")
    __table_args__ = (db.UniqueConstraint("user_id", "property_id", name="unique_user_property_favorite"),
                      )

    def __repr__(self):
        return f"<Favorite User {self.user_id} Property{self.property_id}>"