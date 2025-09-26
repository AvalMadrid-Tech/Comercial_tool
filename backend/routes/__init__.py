from flask import Blueprint
from .identidad import identidad_bp
from .users import user_bp
from .domicilio import domicilios_bp
from .get_cnae import cnae_bp
from .cnae_identidad import cnae_identidad_bp
from .pdf_sociedades import pdf_sociedades_bp
from .create_contactos import create_contactos_bp

def register_routes(app):
    app.register_blueprint(identidad_bp, url_prefix="/")
    app.register_blueprint(user_bp, url_prefix="/api/auth")
    app.register_blueprint(domicilios_bp, url_prefix="/")
    app.register_blueprint(cnae_bp, url_prefix="/")
    app.register_blueprint(cnae_identidad_bp, url_prefix="/")
    app.register_blueprint(pdf_sociedades_bp, url_prefix="/")
    app.register_blueprint(create_contactos_bp, url_prefix="/")

