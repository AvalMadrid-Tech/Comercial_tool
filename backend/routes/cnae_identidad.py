from flask import Blueprint, request, jsonify
from connections.sql_connect import get_connection
from datetime import datetime

cnae_identidad_bp = Blueprint("cnae_id", __name__) 

@cnae_identidad_bp.route("/identidad/<ref_id>/cnae", methods=["POST"])
def insertar_cnae_identidad(ref_id: str):
    """
    Inserta un registro CNAE asociado a una identidad.
    """
    data = request.get_json()
    cod_cnae = data.get("cod_cnae")
    f_inicio = data.get("f_inicio")

    if not cod_cnae:
        return jsonify({"error": "El campo 'cod_cnae' es obligatorio"}), 400

    # --- Normalización de longitudes ---
    ref_id = str(ref_id)[:10]                           # nvarchar(10)
    cod_cnae = str(cod_cnae)[:5]                        # nvarchar(5)
    f_inicio = (f_inicio or datetime.now().strftime("%Y%m%d"))[:8]  # nvarchar(8)
    f_fin = "99991231"                                  # nvarchar(8)
    observaciones = ""                                  # nvarchar(150)
    g3_alta = datetime.now().strftime("%Y%m%d%H%M%S")   # nvarchar(14)
    g3_baja = ""                                        # nvarchar(14), en blanco
    g3_bloqueo = "X"                                    # nvarchar(1)
    g3_control = (datetime.now().strftime("%Y%m%d%H%M%S") + "_API")[:25]  # nvarchar(25)

    # --- Insert SQL ---
    sql = """
    INSERT INTO IDENTIDADES_CNAE
    (REF_ID, COD_CNAE, F_INICIO_ACTIVIDAD, F_FIN_ACTIVIDAD, OBSERVACIONES,
     G3_ALTA, G3_BAJA, G3_BLOQUEO, G3_CONTROL)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(sql, (ref_id, cod_cnae, f_inicio, f_fin, observaciones,
                         g3_alta, g3_baja, g3_bloqueo, g3_control))
    conn.commit()
    conn.close()

    return jsonify({
        "message": f"CNAE {cod_cnae} insertado para REF_ID {ref_id}",
        "ref_id": ref_id,
        "cod_cnae": cod_cnae,
        "f_inicio": f_inicio,
        "f_fin": f_fin,
        "g3_alta": g3_alta,
        "g3_baja": g3_baja,
        "g3_bloqueo": g3_bloqueo,
        "g3_control": g3_control
    })
