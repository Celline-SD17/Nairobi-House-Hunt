from app import app
from configs import db
from models import User, Property, Favorite
from flask_bcrypt import Bcrypt
from faker import Faker
import random

bcrypt = Bcrypt(app)
fake = Faker()

def seed_database():
    with app.app_context():
        Favorite.query.delete()
        Property.query.delete()
        User.query.delete()

        db.session.commit()
        #Generating House Hunters details
        hunters = []
        for _ in range(10):
            hunter = User(
                username=fake.unique.user_name(),
                password_hash=bcrypt.generate_password_hash(
                    "password123"
                ).decode("utf-8"),
                role="hunter"
            )
            hunters.append(hunter)
        #Generating landlords details
        landlords = []

        for _ in range(5):
            landlord = User(
                username=fake.unique.user_name(),
                password_hash=bcrypt.generate_password_hash(
                    "password123"
                ).decode("utf-8"),
                role="landlord",
                email=fake.unique.email(),
                phone=fake.unique.phone_number()
                )
            landlords.append(landlord)

        users = hunters + landlords
        random.shuffle(users)

        db.session.add_all(users)
        db.session.commit()
        
        areas = [
                "Kilimani",
                "Lavington",
                "Westlands",
                "Parklands",
                "Kileleshwa",
                "Karen",
                "Runda",
                "South B",
                "South C",
                "Lang'ata",
                "Roysambu",
                "Kasarani",
                "Ngong Road",
                "Upper Hill",
                "Hurlingham"
            ]
        #Property types
        property_types = [
                "Apartment",
                "Condominium",
                "Maisonette",
                "Townhouse"
            ]
        price_ranges ={
                1: (15000, 90000),
                2: (35000, 150000),
                3: (70000, 250000),
                4: (100000, 650000)
        }
        #Properties data 
        properties = []

        for _ in range(40):
            landlord = random.choice(landlords)
            area = random.choice(areas)
            property_type = random.choice(property_types)
            bedrooms = random.randint(1, 4)
            min_price, max_price = price_ranges[bedrooms]
            price = random.randint(min_price, max_price)

            property = Property(
                title=f"{bedrooms} Bedroom {property_type} in {area}",
                price=price,
                currency="KES",
                location=area,
                county="Nairobi",
                city="Nairobi",
                area=area,
                bedrooms=bedrooms,
                bathrooms=random.randint(1, 4),
                property_type=property_type,
                description=fake.text(max_nb_chars=250),
                landlord_id=landlord.id
            )

            properties.append(property)

        db.session.add_all(properties)
        db.session.commit()

        # Favorites
        favorites = []
        favorite_pairs = set()

        while len(favorites) < 15:
            hunter = random.choice(hunters)
            property = random.choice(properties)

            pair = (hunter.id, property.id)

            if pair not in favorite_pairs:
                favorite_pairs.add(pair)

                favorite = Favorite(
                    user_id=hunter.id,
                    property_id=property.id,
                    notes=fake.sentence()
                )

                favorites.append(favorite)

        db.session.add_all(favorites)
        db.session.commit()

        print("Database seeded successfully!")
        print("Seeded Users:")
        for user in users:
            print(f"Username: {user.username} Role: {user.role}")


if __name__ == "__main__":
    seed_database()