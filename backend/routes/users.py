from flask import Blueprint, request, jsonify
from backend.models.identidad_model import User
from backend.connections.sql_connect import db
import jwt
import datetime
from functools import wraps
import os

identidad_bp = Blueprint("identidad", __name__)

SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey")

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if "Authorization" in request.headers:
            token = request.headers["Authorization"].split(" ")[1]  # Bearer <token>

        if not token:
            return jsonify({"message": "Token es requerido"}), 401

        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            current_user = User.query.get(data["user_id"])
        except:
            return jsonify({"message": "Token inválido"}), 401

        return f(current_user, *args, **kwargs)
    return decorated

@identidad_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"message": "El email ya está registrado"}), 400

    new_user = User(email=data["email"])
    new_user.set_password(data["password"])

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Usuario creado correctamente"}), 201

@identidad_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data["email"]).first()

    if not user or not user.check_password(data["password"]):
        return jsonify({"message": "Credenciales inválidas"}), 401

    token = jwt.encode({
        "user_id": user.id,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=2)
    }, SECRET_KEY, algorithm="HS256")

    return jsonify({"token": token}), 200

@identidad_bp.route("/protected", methods=["GET"])
@token_required
def protected(current_user):
    return jsonify({"message": f"Hola {current_user.email}, accediste a una ruta protegida"})
