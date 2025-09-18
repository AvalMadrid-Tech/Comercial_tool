from flask import Flask, jsonify
from flask_cors import CORS
from backend.routes import register_routes
from backend.connections.postgresql_connect import init_postgres, db_pg
from flask_migrate import Migrate
import sys, os
from dotenv import load_dotenv

load_dotenv()
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "fallback_secret")  # 🔑

CORS(app)

# inicializar conexión PostgreSQL
init_postgres(app)

# inicializar migraciones
migrate = Migrate(app, db_pg)

# registrar blueprints
register_routes(app)

@app.route("/")
def hello():
    return jsonify({"message": "Hola desde Flask 🚀"})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
