import uuid
from datetime import datetime
from flask import Blueprint, request, jsonify
from backend.connections.sql_connect import get_connection
from backend.models.identidad_model import IdentidadIn, IdentidadOut

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
    "CLASIF_PYME_METODO": "A"
}


@identidad_bp.route("", methods=["POST"])
def create_identidad():
    data = request.get_json()

    try:
        # Validar datos de entrada
        identidad = IdentidadIn(**data)

        with get_connection() as conn:
            with conn.cursor() as cursor:
                # REF_ID generado
                ref_id = str(uuid.uuid4())[:10]  # truncado a 10

                # G3_IDENTIDAD autoincremental (identity)
                cursor.execute("""
                    INSERT INTO Identidades (
                        REF_ID, COD_DELEGACION, TIPO_IDENTIDAD, TITULAR, NOMBRE, APELLIDOS,
                        NOMBRE_COMERCIAL, PAIS_NIF, CIT, WEB, ACTIVIDAD, COD_GESTOR,
                        VALIDEZ_DATOS, PROCESO_ALTA, F_ALTA, COD_SOPORTE, ID_OBSERVACION,
                        REGIMEN_ECONOMICO, DATOS_REGISTRALES, F_CONSTITUCION, EXPORTA,
                        NIVEL_COMPLETITUD, CLASIF_PYME, G3_BLOQUEO, G3_CONTROL, COD_CNAE,
                        DECLARAR_ASNEF, NUM_SS, EXP_EXTERNO_WEB, F_CADUCIDAD_CIT,
                        PERSONA_RESPONSABILIDAD_PUBLICA, IDIOMA, WEB_IDENTIDAD, WEB_USUARIO,
                        PAIS_NACIONALIDAD, CLASIF_PYME_METODO
                    )
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    ref_id,
                    identidad.COD_DELEGACION,
                    identidad.TIPO_IDENTIDAD,
                    identidad.TITULAR,
                    identidad.NOMBRE,
                    identidad.APELLIDOS,
                    identidad.NOMBRE_COMERCIAL,
                    identidad.PAIS_NIF,
                    identidad.CIT,
                    identidad.WEB or " ",   # no nulls
                    identidad.ACTIVIDAD,
                    identidad.COD_GESTOR,
                    identidad.VALIDEZ_DATOS,
                    identidad.PROCESO_ALTA,
                    identidad.F_ALTA.strftime("%Y%m%d"),
                    identidad.COD_SOPORTE,
                    identidad.ID_OBSERVACION,
                    identidad.REGIMEN_ECONOMICO,
                    identidad.DATOS_REGISTRALES or " ",
                    identidad.F_CONSTITUCION.strftime("%Y%m%d"),
                    identidad.EXPORTA,
                    identidad.NIVEL_COMPLETITUD,
                    identidad.CLASIF_PYME,
                    identidad.G3_BLOQUEO,
                    g3_control,  # generado YYYYMMDDHHMMSS+IDGESTOR
                    identidad.COD_CNAE,
                    identidad.DECLARAR_ASNEF,
                    identidad.NUM_SS or " ",
                    identidad.EXP_EXTERNO_WEB or " ",
                    identidad.F_CADUCIDAD_CIT.strftime("%Y%m%d") if identidad.F_CADUCIDAD_CIT else None,
                    identidad.PERSONA_RESPONSABILIDAD_PUBLICA,
                    identidad.IDIOMA,
                    identidad.WEB_IDENTIDAD or 0,
                    identidad.WEB_USUARIO,
                    identidad.PAIS_NACIONALIDAD,
                    identidad.CLASIF_PYME_METODO
                ))

                # Debug para verificar longitudes
                print("\n🔎 DEBUG VALORES A INSERTAR")
                for k, v in values.items():
                    if isinstance(v, str):
                        print(f" - {k}: {repr(v)} (len={len(v)})")
                    else:
                        print(f" - {k}: {v} ({type(v).__name__})")
                print("⚡ Fin debug\n")

                # Ejecutar INSERT (sin G3_IDENTIDAD, lo maneja SQL Server como IDENTITY)
                cursor.execute(f"""
                    INSERT INTO Identidades (
                        {", ".join(values.keys())}
                    ) VALUES (
                        {", ".join(["?"] * len(values))}
                    )
                """, tuple(values.values()))

                conn.commit()

        # Respuesta
        identidad_out = IdentidadOut(**identidad.dict(), REF_ID=ref_id, G3_IDENTIDAD=next_g3)
        return jsonify(identidad_out.dict()), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500







# 📌 GET /identidades → Listar identidades
@identidad_bp.route("", methods=["GET"])
def get_identidades():
    try:
        with get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute("SELECT TOP 50 * FROM Identidades ORDER BY F_ALTA DESC")
                columns = [col[0] for col in cursor.description]
                results = [dict(zip(columns, row)) for row in cursor.fetchall()]
                return jsonify(results)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# 📌 GET /identidades/<ref_id> → Consultar una identidad puntual
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
                return jsonify(dict(zip(columns, row)))
    except Exception as e:
        return jsonify({"error": str(e)}), 500
