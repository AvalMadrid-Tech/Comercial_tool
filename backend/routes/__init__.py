from flask import Blueprint
from .identidad import identidad_bp
# en el futuro: from .usuarios import usuarios_bp, from .productos import productos_bp, etc.

def register_routes(app):
    app.register_blueprint(identidad_bp, url_prefix="/api/identidades")


