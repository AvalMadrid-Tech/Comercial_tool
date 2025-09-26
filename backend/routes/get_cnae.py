from flask import Blueprint, jsonify
from connections.sql_connect import get_connection

cnae_bp = Blueprint("cnae", __name__)

@cnae_bp.route("/cnae", methods=["GET"])
def get_cnae():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT COD_CNAE, DESCRI_CNAE FROM T_BE_CNAE")
    rows = cursor.fetchall()
    conn.close()

    result = [{"codigo": row[0], "descripcion": row[1]} for row in rows]
    return jsonify(result)
