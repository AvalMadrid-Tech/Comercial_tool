from backend.connections.postgresql_connect import db_pg
from werkzeug.security import generate_password_hash, check_password_hash

class User(db_pg.Model):
    __tablename__ = "usuarios"

    id = db_pg.Column(db_pg.Integer, primary_key=True)
    usuario = db_pg.Column(db_pg.String(120), unique=True, nullable=False)
    email = db_pg.Column(db_pg.String(120), unique=True, nullable=False)
    password_hash = db_pg.Column(db_pg.String(200), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
