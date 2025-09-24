from flask import Blueprint, request, jsonify, current_app
from models.users import User
from connections.postgresql_connect import db_pg as db
import jwt
import datetime
from functools import wraps
import os


user_bp = Blueprint("user", __name__)

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


user_bp = Blueprint("user", __name__)

@user_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    usuario = data.get("usuario")
    email = data.get("email")
    password = data.get("password")

    if User.query.filter((User.usuario == usuario) | (User.email == email)).first():
        return jsonify({"error": "Usuario o email ya registrados"}), 400

    new_user = User(usuario=usuario, email=email)
    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Usuario registrado correctamente"}), 201


@user_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    usuario = data.get("usuario")
    password = data.get("password")

    if not usuario or not password:
        return jsonify({"error": "Faltan credenciales"}), 400

    # Permitir login con usuario o email
    user = User.query.filter(
        (User.usuario == usuario) | (User.email == usuario)
    ).first()

    if not user or not user.check_password(password):
        return jsonify({"error": "Credenciales inválidas"}), 401

    token = jwt.encode(
        {"id": user.id, "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=2)},
        current_app.config["SECRET_KEY"],
        algorithm="HS256"
    )

    return jsonify({
        "token": token,
        "usuario": user.usuario,
        "email": user.email
    })
@user_bp.route("/reset-password", methods=["POST"])
def reset_password():
    data = request.get_json()
    usuario = data.get("usuario")
    new_password = data.get("new_password")

    user = User.query.filter_by(usuario=usuario).first()
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    user.set_password(new_password)
    db.session.commit()

    return jsonify({"message": f"Contraseña actualizada para {usuario} ✅"})


@user_bp.route("/protected", methods=["GET"])
@token_required
def protected(current_user):
    return jsonify({"message": f"Hola {current_user.email}, accediste a una ruta protegida"})
