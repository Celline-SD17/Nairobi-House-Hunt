from configs import db

#User Model
class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column (db.String(128), nullable=False)
    role = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=True)
    phone = db.Column(db.String(30), unique=True, nullable=True)


    properties = db.relationship("Property", back_populates="landlord", cascade="all, delete-orphan")
    favorites = db.relationship("Favorite", back_populates="user", cascade="all, delete-orphan")
    sent_messages = db.relationship("Message", foreign_keys="Message.sender_id", back_populates="sender", cascade="all, delete-orphan")
    received_messages = db.relationship("Message", foreign_keys="Message.receiver_id", back_populates="receiver", cascade="all, delete-orphan")

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
    messages = db.relationship("Message", back_populates="property", cascade="all, delete-orphan")

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


class Message(db.Model):
    __tablename__ = "messages"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    is_read = db.Column(db.Boolean, default=False, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now(), nullable=False)
    sender_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    property_id = db.Column(db.Integer, db.ForeignKey("properties.id"), nullable=False)

    sender = db.relationship( "User",foreign_keys=[sender_id], back_populates="sent_messages")
    receiver = db.relationship("User", foreign_keys=[receiver_id], back_populates="received_messages")
    property = db.relationship("Property", back_populates="messages")
    

    def __repr__(self):
        return f"<Message {self.id}>"