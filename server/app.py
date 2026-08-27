import os

from dotenv import load_dotenv
from flask import Flask, request, session
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from marshmallow import ValidationError
from flask_cors import CORS


from configs import db
from models import User, Property, Favorite
from schema import UserSchema, PropertySchema, FavoriteSchema

load_dotenv()

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")

CORS(
    app, 
    origins=[
        "http://localhost:5173",
        "https://nairobi-house-hunt-api.onrender.com/"
        ],        
    supports_credentials=True
)

db.init_app(app)
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)


def get_current_user():
    user_id = session.get("user_id")
    if not user_id:
        return None
    return db.session.get(User, user_id)


def require_role(role):
    user = get_current_user()
    if not user:
        return {"error": "Unauthorized"}, 401
    if user.role != role:
        return {"error": "Forbidden"}, 403
    return user


#Before request
@app.before_request
def check_authentication():
    if request.method == "OPTIONS":
        return
    open_access_list = [
        "index",
        "about",
        "signup",
        "login",
        "check_session",
        "get_properties",
        "static"
    ]
    if request.endpoint in open_access_list:
        return
    if not session.get("user_id"):
        return {"error": "Unauthorized"}, 401

#Home route
@app.get("/")
def index():
    return {"message": "Nairobi House Hunt API is running!"}


#Signup Route
@app.post("/signup")
def signup():
    data = request.get_json()
    try:
        user_data = UserSchema().load(data)
    except Exception as error:
        return{"errors": str(error)}, 400
    if user_data["role"] == "landlord":
        if not user_data.get("email") or not user_data.get("phone"):
            return{
                "error": "Landlords must provide an email and a phone number."
            },400
    existing_user = User.query.filter_by(
        username=user_data["username"]
    ).first()

    if existing_user:
        return{"error": "Username already exists"}, 409
    hashed_password = bcrypt.generate_password_hash(
        user_data["password"]
    ).decode("utf-8")

    user = User(
        username=user_data["username"],
        password_hash=hashed_password,
        role=user_data["role"],
        email=user_data.get("email"),
        phone=user_data.get("phone")
    )
    db.session.add(user)
    db.session.commit()

    session["user_id"] = user.id
    session["role"] = user.role
    return{
        "id": user.id,
        "username": user.username,
        "role": user.role
    }, 201


#Logging in
@app.post("/login")
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return {"error": "Username and password are required"}, 400
    user = User.query.filter_by(username=username).first()
    if not user:
        return {"error": "Invalid username or password"}, 401
    if not bcrypt.check_password_hash(user.password_hash, password):
        return {"error": "Invalid username or password"}, 401
    
    session["user_id"] = user.id
    session["role"] = user.role

    return {
        "id": user.id,
        "username": user.username,
        "role": user.role
    }, 200

#Checking Sessions
@app.get("/check_session")
def check_session():
    user_id = session.get("user_id")
    if not user_id:
        return {"error": "Not logged in"}, 401
    user = db.session.get(User, user_id)

    if not user:
        session.clear()
        return {"error": "User not found"}, 401
    return {
        "id": user.id,
        "username": user.username,
        "role": user.role
    }, 200

# Logging Out
@app.delete("/logout")
def logout():
    session.clear()
    return{}, 204


#Properties routes
@app.get("/properties")
def get_properties():
    page = request.args.get("page", 1, type=int)
    per_page = request.args.get("per_page", 10, type=int)
    search = request.args.get("search", "", type=str).strip()
    bedrooms = request.args.get("bedrooms", None, type=int)
    max_price = request.args.get("max_price", None, type=int)
    sort = request.args.get("sort", "", type=str)

    if page < 1 or per_page < 1:
        return {"error": "page and per_page must be positive numbers"}, 400

    query = Property.query

    #Searching by title, location, area, or property type
    if search:
        search_term = f"%{search}%"
        query = query.filter(
            db.or_(
                Property.title.ilike(search_term),
                Property.location.ilike(search_term),
                Property.area.ilike(search_term),
                Property.property_type.ilike(search_term)
            )
        )

    #Bedroom filter
    if bedrooms:
        query = query.filter(Property.bedrooms == bedrooms)

    #Maximum price filter
    if max_price:
        query = query.filter(Property.price <= max_price)

    # Sorting
    if sort == "price-low":
        query = query.order_by(Property.price.asc())
    elif sort == "price-high":
        query = query.order_by(Property.price.desc())
    else:
        query = query.order_by(Property.id.asc())

    pagination = query.paginate(
        page=page,
        per_page=per_page,
        error_out=False
    )

    properties = PropertySchema(many=True).dump(pagination.items)
    return {
        "properties": properties,
        "pagination": {
            "page": pagination.page,
            "per_page": pagination.per_page,
            "total": pagination.total,
            "pages": pagination.pages,
            "has_next": pagination.has_next,
            "has_prev": pagination.has_prev
        }
    }, 200
#Viewing properties by ID
@app.get("/properties/<int:id>")
def get_property(id):
    property = db.session.get(Property, id)
    if not property:
        return{"error": "Property not found"}, 404
    return PropertySchema().dump(property), 200

#Landlords creating properties

@app.post("/properties")
def create_property():
    user = require_role("landlord")

    if isinstance(user, tuple):
        return user
    data = request.get_json()
    try:
        property_data = PropertySchema().load(data)
    except ValidationError as error:
        return {"errors": error.messages}, 400
    
    property = Property(
        title=property_data["title"],
        price=property_data["price"],
        currency=property_data["currency"],
        location=property_data["location"],
        county=property_data["county"],
        city=property_data["city"],
        area=property_data["area"],
        bedrooms=property_data["bedrooms"],
        bathrooms=property_data["bathrooms"],
        property_type=property_data["property_type"],
        description=property_data["description"],
        landlord_id=user.id
    )

    db.session.add(property)
    db.session.commit()

    return PropertySchema().dump(property), 201

#Landlord viewing their properties
@app.get("/my-properties")
def get_my_properties():
    user = require_role("landlord")
    if isinstance(user, tuple):
        return user
    properties = Property.query.filter_by(
        landlord_id=user.id
    ).all()
    return PropertySchema(many=True).dump(properties), 200

#Update property
@app.patch("/properties/<int:id>")
def update_property(id):
    user = require_role("landlord")
    if isinstance(user, tuple):
        return user
    property = db.session.get(Property, id)
    if not property:
        return {"error": "Property not found"}, 404
    if property.landlord_id != user.id:
        return {"error": "You can only update your own properties"}, 403
    data = request.get_json()
    try:
        property_data = PropertySchema().load(
            data,
            partial=True
        )
    except ValidationError as error:
        return {"errors": error.messages}, 400
    for field, value in property_data.items():
        setattr(property, field, value)
    db.session.commit()
    return PropertySchema().dump(property), 200

#Delete property
@app.delete("/properties/<int:id>")
def delete_property(id):
    user = require_role("landlord")
    if isinstance(user, tuple):
        return user
    property = db.session.get(Property, id)
    if not property:
        return {"error": "Property not found"}, 404
    if property.landlord_id != user.id:
        return {"error": "You can only delete your own properties"}, 403
    db.session.delete(property)
    db.session.commit()
    return {}, 204

#Adding properties to favorites
@app.post("/favorites")
def create_favorite():
    user = require_role("hunter")
    if isinstance(user, tuple):
        return user
    data = request.get_json()
    try:
        favorite_data = FavoriteSchema().load(data)
    except ValidationError as error:
        return {"errors": error.messages}, 400
    property = db.session.get(Property, favorite_data["property_id"])
    if not property:
        return {"error": "Property not found"}, 404
    existing_favorite = Favorite.query.filter_by(
        user_id=user.id,
        property_id=property.id
    ).first()
    if existing_favorite:
        return {"error": "Property is already in your favorites"}, 409
    favorite = Favorite(
        user_id=user.id,
        property_id=property.id,
        notes=favorite_data.get("notes")
    )

    db.session.add(favorite)
    db.session.commit()

    return FavoriteSchema().dump(favorite), 201

# A hunter getting their favorites
@app.get("/favorites")
def get_favorites():
    user = require_role("hunter")
    if isinstance(user, tuple):
        return user
    favorites = Favorite.query.filter_by(user_id=user.id).all()
    return FavoriteSchema(many=True).dump(favorites), 200

#getting favorites by id
@app.get("/favorites/<int:id>")
def get_favorite(id):
    user = require_role("hunter")
    if isinstance(user, tuple):
        return user
    favorite = db.session.get(Favorite, id)
    if not favorite:
        return {"error": "Favorite not found"}, 404
    if favorite.user_id != user.id:
        return {"error": "You can only view your own favorites"}, 403
    return FavoriteSchema().dump(favorite), 200

#Patching notes on favorites
@app.patch("/favorites/<int:id>")
def update_favorite(id):
    user = require_role("hunter")
    if isinstance(user, tuple):
        return user
    favorite = db.session.get(Favorite, id)
    if not favorite:
        return {"error": "Favorite not found"}, 404
    if favorite.user_id != user.id:
        return {"error": "You can only update your own favorites"}, 403
    data = request.get_json()
    if "notes" not in data:
        return {"error": "Only notes can be updated"}, 400
    favorite.notes = data["notes"]

    db.session.commit()
    return FavoriteSchema().dump(favorite), 200

#Removing a property from favorites
@app.delete("/favorites/<int:id>")
def delete_favorite(id):
    user = require_role("hunter")
    if isinstance(user, tuple):
        return user
    favorite = db.session.get(Favorite, id)
    if not favorite:
        return {"error": "Favorite not found"}, 404
    if favorite.user_id != user.id:
        return {"error": "You can only delete your own favorites"}, 403

    db.session.delete(favorite)
    db.session.commit()
    return {}, 204

if __name__ == "__main__":
    app.run(debug=True) 