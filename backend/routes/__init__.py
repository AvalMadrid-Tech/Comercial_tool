from flask import Blueprint
from .identidad import identidad_bp
from .users import user_bp

def register_routes(app):
    app.register_blueprint(identidad_bp, url_prefix="/")
    app.register_blueprint(user_bp, url_prefix="/api/auth")

