from marshmallow import (Schema, fields, validates_schema, ValidationError)

class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    username = fields.Str(required=True)
    password = fields.Str(load_only=True, required=True)
    confirm_password = fields.Str(load_only=True, required=True)
    role = fields.Str(required=True, validate=lambda value: value in ["hunter", "landlord"])

    @validates_schema
    def validate_passwords(self, data, **kwargs):
        if data.get("password") != data.get("confirm_password"):
            raise ValidationError("Passwords do not match.")

class PropertySchema(Schema):
    id = fields.Int(dump_only=True)
    title = fields.Str(required=True)
    price = fields.Int(required=True)
    currency = fields.Str(required=True)
    location = fields.Str(required=True)
    county = fields.Str(required=True)
    city = fields.Str(required=True)
    area = fields.Str(required=True)
    bedrooms = fields.Int(required=True)
    bathrooms = fields.Int(required=True)
    property_type = fields.Str(required=True)
    description = fields.Str(required=True)
    landlord_id = fields.Int(dump_only=True) 

class FavoriteSchema(Schema):
    id = fields.Int(dump_only=True)
    user_id = fields.Int(dump_only=True)
    property_id = fields.Int(required=True)
    notes = fields.Str(allow_none=True)
    property = fields.Nested(
        PropertySchema, 
        dump_only=True
    )


