from flask import Blueprint, request, jsonify
from connections.sql_connect import get_connection
from datetime import datetime
from utils.validators import validar_documento   
import traceback

create_contacto_bp = Blueprint("create_contacto", __name__)

@create_contacto_bp.route("/api/contactos", methods=["POST"])
def create_contacto():
    try:
        data = request.json
        print("📥 Datos contacto recibidos:", data)

        cit = data.get("CIT")
        if not validar_documento(cit):
            return jsonify({
                "status": "ERROR",
                "message": f"El documento {cit} no es válido"
            }), 400

        conn = get_connection()
        conn.autocommit = True
        cursor = conn.cursor()

        # 🔹 Fechas y control
        g3_alta = datetime.now().strftime("%Y%m%d%H%M%S")
        usuario_alta = data.get("USUARIO_ALTA", "API")
        g3_control = g3_alta + usuario_alta

        # 🔹 Todas las columnas obligatorias excepto IDCONTACTO (IDENTITY)
        columns = [
            "REF_ID", "TFNO_FIJO", "TFNO_MOVIL", "FAX",
            "E_MAIL", "NOTAS", "G3_ALTA", "USUARIO_ALTA",
            "G3_BAJA", "USUARIO_BAJA",
            "APELLIDOS", "NOMBRE", "TRATAMIENTO", "CARGO",
            "NO_SMS", "D0", "D1", "D2", "D3", "D4", "D5", "D6",
            "TEXTO_ALTA", "TEXTO_BAJA", "REF_ID_CONTACTO",
            "G3_BLOQUEO", "G3_CONTROL", "CIT", "REFERENCIA_EXTERNA"
        ]

        params = [
            data["REF_ID"],
            data.get("TFNO_FIJO") or "",
            data.get("TFNO_MOVIL") or "",
            data.get("FAX") or "",
            data.get("E_MAIL") or "",
            data.get("NOTAS") or "",
            g3_alta,
            usuario_alta,
            "",                                  # G3_BAJA
            "",                                  # USUARIO_BAJA
            data.get("APELLIDOS") or "",
            data.get("NOMBRE") or "",
            data.get("TRATAMIENTO") or "S",
            data.get("CARGO") or "",
            data.get("NO_SMS", 0),
            data.get("D0", 0),
            data.get("D1", 0),
            data.get("D2", 0),
            data.get("D3", 0),
            data.get("D4", 0),
            data.get("D5", 0),
            data.get("D6", 0),
            "ALTA MANUAL G3",
            "",                                  # TEXTO_BAJA
            "",                                  # REF_ID_CONTACTO
            "X",                                 # G3_BLOQUEO
            g3_control,
            cit or "",
            data.get("REFERENCIA_EXTERNA") or ""
        ]

        # 🔹 Usamos OUTPUT para devolver el ID generado
        sql = f"""
        INSERT INTO dbo.IDENTIDADES_CONTACTOS ({", ".join(columns)})
        OUTPUT INSERTED.IDCONTACTO
        VALUES ({", ".join("?" for _ in columns)})
        """

        cursor.execute(sql, params)
        new_id = cursor.fetchone()[0]
        conn.commit()

        return jsonify({
            "status": "OK",
            "IDCONTACTO": int(new_id),
            "REF_ID": data["REF_ID"],
            "CIT": cit,
        })

    except Exception as e:
        print("❌ Error en create_contacto:", str(e))
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
