from flask import Blueprint, request, jsonify
from backend.connections.sql_connect import get_connection  

domicilios_bp = Blueprint("domicilios", __name__)

@domicilios_bp.route("/domicilios", methods=["POST"])
def create_domicilio():
    data = request.json
    try:
        conn = get_connection()
        cursor = conn.cursor()

        # generar G3_ALTA en formato yyyymmddHHMMSS
        from datetime import datetime
        g3_alta = datetime.now().strftime("%Y%m%d%H%M%S")

        # buscar el siguiente G3_DOMICILIO para ese REF_ID
        cursor.execute("SELECT ISNULL(MAX(G3_DOMICILIO), 0) + 1 FROM dbo.IDENTIDADES_DOMICILIOS WHERE REF_ID = ?", (data["REF_ID"],))
        next_g3_domicilio = cursor.fetchone()[0]

        cursor.execute("""
            INSERT INTO dbo.IDENTIDADES_DOMICILIOS
            (
                REF_ID, COD_TIPODOMICILIO, G3_ALTA, PREDETERMINADO,
                TIPO_VIA, NOMBRE_VIA, NUMERO_VIA, POBLACION,
                COD_POSTAL, COD_PAIS, TELEFONO, EMAIL,
                VALIDO, NUT, G3_BLOQUEO, G3_CONTROL
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'S', ?, 'X', ?)
        """, (
            data["REF_ID"],
            data.get("COD_TIPODOMICILIO", 0),
            g3_alta,
            data.get("PREDETERMINADO", 0),
            data.get("TIPO_VIA"),
            data.get("NOMBRE_VIA"),
            data.get("NUMERO_VIA"),
            data.get("POBLACION"),
            data.get("COD_POSTAL"),
            data.get("COD_PAIS", "ES"),
            data.get("TELEFONO"),
            data.get("EMAIL"),
            data.get("NUT", "ES999"),
            g3_alta + "_APP"
        ))


        conn.commit()
        return jsonify({"message": "Domicilio creado con éxito"}), 201

    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 400
    finally:
        conn.close()
