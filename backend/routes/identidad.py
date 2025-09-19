import uuid
from datetime import datetime
from flask import Blueprint, request, jsonify
from backend.connections.sql_connect import get_connection
from backend.models.identidad_model import IdentidadIn, IdentidadOut
import traceback

identidad_bp = Blueprint("identidad", __name__)

# 🔹 Defaults para columnas NOT NULL
DEFAULTS = {
    "WEB": " ",
    "DATOS_REGISTRALES": " ",
    "NUM_SS": " ",
    "EXP_EXTERNO_WEB": " ",
    "WEB_IDENTIDAD": 0,
    "WEB_USUARIO": 0,
    "COD_SOPORTE": 1,
    "ID_OBSERVACION": 0,
    "NIVEL_COMPLETITUD": 0,
    "EXPORTA": "N",
    "G3_BLOQUEO": "X",
    "IDIOMA": "S",
    "CLASIF_PYME_METODO": "A",
    "F_CADUCIDAD_CIT": "99991231"  


}


def parse_date(value):
    """Convierte string ISO 'YYYY-MM-DD' a datetime; si ya es datetime lo devuelve tal cual"""
    if isinstance(value, str):
        return datetime.fromisoformat(value)  # '2025-09-18' -> datetime
    return value


@identidad_bp.route("/api/identidades", methods=["POST"])
def create_identidad():
    try:
        data = request.json
        print(f"📥 Datos recibidos en backend: {data}")

        identidad = IdentidadIn(**data)

        conn = get_connection()
        conn.autocommit = True
        cursor = conn.cursor()

        # 🔎 Validar si CIT ya existe
        cursor.execute("SELECT 1 FROM IDENTIDADES WHERE CIT = ?", (identidad.CIT,))
        if cursor.fetchone():
            return jsonify({
                "status": "ERROR",
                "msg": f"El CIT '{identidad.CIT}' ya existe en la base de datos"
            }), 409

        # 🔹 Obtener REF_ID numérico máximo
        cursor.execute("SELECT MAX(CAST(REF_ID AS BIGINT)) FROM IDENTIDADES WHERE ISNUMERIC(REF_ID) = 1")
        max_refid = cursor.fetchone()[0]

        if max_refid is None:
            new_ref_id = 2800000000  # valor inicial si tabla vacía
        else:
            new_ref_id = max_refid + 1

        ref_id = str(new_ref_id)  # REF_ID como string numérico

        # Generar G3_CONTROL
        g3_control = datetime.now().strftime("%Y%m%d%H%M%S") + identidad.COD_GESTOR

        # Normalizar fechas
        f_alta = parse_date(identidad.F_ALTA)
        f_constitucion = parse_date(identidad.F_CONSTITUCION)

        # Columnas en orden real
        columns = [
            "REF_ID", "COD_DELEGACION", "TIPO_IDENTIDAD", "TITULAR",
            "NOMBRE", "APELLIDOS", "NOMBRE_COMERCIAL", "PAIS_NIF",
            "CIT", "WEB", "ACTIVIDAD", "COD_GESTOR", "VALIDEZ_DATOS",
            "PROCESO_ALTA", "F_ALTA", "COD_SOPORTE", "ID_OBSERVACION",
            "REGIMEN_ECONOMICO", "DATOS_REGISTRALES", "F_CONSTITUCION",
            "EXPORTA", "NIVEL_COMPLETITUD", "CLASIF_PYME", "G3_BLOQUEO",
            "G3_CONTROL", "COD_CNAE", "DECLARAR_ASNEF", "NUM_SS",
            "EXP_EXTERNO_WEB", "F_CADUCIDAD_CIT", "PERSONA_RESPONSABILIDAD_PUBLICA",
            "IDIOMA", "WEB_IDENTIDAD", "WEB_USUARIO", "PAIS_NACIONALIDAD",
            "CLASIF_PYME_METODO"
        ]

        # Params en mismo orden
        params = [
            ref_id,
            identidad.COD_DELEGACION,
            identidad.TIPO_IDENTIDAD,
            identidad.TITULAR,
            identidad.NOMBRE,
            identidad.APELLIDOS,
            identidad.NOMBRE_COMERCIAL,
            identidad.PAIS_NIF,
            identidad.CIT,
            identidad.WEB or "",
            identidad.ACTIVIDAD,
            identidad.COD_GESTOR,
            identidad.VALIDEZ_DATOS,
            identidad.PROCESO_ALTA,
            f_alta.strftime("%Y%m%d") if f_alta else None,
            identidad.COD_SOPORTE,
            identidad.ID_OBSERVACION,
            identidad.REGIMEN_ECONOMICO,
            identidad.DATOS_REGISTRALES or "",
            f_constitucion.strftime("%Y%m%d") if f_constitucion else None,
            identidad.EXPORTA,
            identidad.NIVEL_COMPLETITUD,
            identidad.CLASIF_PYME,
            identidad.G3_BLOQUEO,
            g3_control,
            identidad.COD_CNAE,
            identidad.DECLARAR_ASNEF,
            identidad.NUM_SS or "",
            identidad.EXP_EXTERNO_WEB or "",
            DEFAULTS["F_CADUCIDAD_CIT"],  # siempre con valor default
            identidad.PERSONA_RESPONSABILIDAD_PUBLICA,
            identidad.IDIOMA,
            identidad.WEB_IDENTIDAD,
            identidad.WEB_USUARIO,
            identidad.PAIS_NACIONALIDAD,
            identidad.CLASIF_PYME_METODO,
        ]

        # 🔹 INSERT final
        sql = f"""
        INSERT INTO dbo.IDENTIDADES ({', '.join(columns)})
        VALUES ({', '.join(['?' for _ in columns])})
        """
        cursor.execute(sql, params)
        conn.commit()
        print("✅ Insert realizado correctamente")
        cursor.execute("SELECT TOP 1 REF_ID, CIT, F_ALTA FROM dbo.IDENTIDADES WHERE CIT = ?", (identidad.CIT,))
        row = cursor.fetchone()
        print("🔎 Verificación inmediata tras insert:", row)


        return jsonify({
            "status": "OK",
            "REF_ID": ref_id,
            "G3_CONTROL": g3_control
        })

    except Exception as e:
        print(f"❌ Error en create_identidad: {e}")
        return jsonify({"error": str(e)}), 500

@identidad_bp.route("", methods=["GET"])
def get_identidades():
    try:
        with get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute("SELECT TOP 50 * FROM Identidades ORDER BY F_ALTA DESC")
                columns = [col[0] for col in cursor.description]
                results = [dict(zip(columns, row)) for row in cursor.fetchall()]
                identidades_out = [IdentidadOut(**r).dict() for r in results]
                return jsonify(identidades_out)
    except Exception as e:
        print("❌ Error en get_identidades:", str(e))
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


@identidad_bp.route("/<ref_id>", methods=["GET"])
def get_identidad(ref_id):
    try:
        with get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute("SELECT * FROM Identidades WHERE REF_ID = ?", (ref_id,))
                row = cursor.fetchone()
                if not row:
                    return jsonify({"error": "Identidad no encontrada"}), 404
                columns = [col[0] for col in cursor.description]
                data = dict(zip(columns, row))
                identidad_out = IdentidadOut(**data).dict()
                return jsonify(identidad_out)
    except Exception as e:
        print("❌ Error en get_identidad:", str(e))
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
