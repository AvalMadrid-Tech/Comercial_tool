# test_insert_check.py
from datetime import datetime
from backend.connections.sql_connect import get_connection

def main():
    conn = get_connection()
    conn.autocommit = True  # 👈 forzamos autocommit
    cursor = conn.cursor()

    cit = "99999999Z"
    ref_id = "2999999999"
    g3_control = datetime.now().strftime("%Y%m%d%H%M%S") + "TEST"

    sql = """
    INSERT INTO dbo.IDENTIDADES
    (REF_ID, COD_DELEGACION, TIPO_IDENTIDAD, TITULAR,
     NOMBRE, APELLIDOS, PAIS_NIF, CIT,
     F_ALTA, G3_CONTROL, REGIMEN_ECONOMICO, IDIOMA)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """

    params = (
        ref_id, "28", "F", "Test Insert",
        "Test", "Python", "ES", cit,
        datetime.now().strftime("%Y%m%d"), g3_control, "S", "S"
    )

    cursor.execute(sql, params)
    print("✅ Insert ejecutado")

    # Verificación inmediata
    cursor.execute("SELECT TOP 1 REF_ID, CIT, F_ALTA, G3_CONTROL FROM dbo.IDENTIDADES WHERE CIT = ?", (cit,))
    row = cursor.fetchone()
    print("🔎 Verificación inmediata:", row)

    cursor.close()
    conn.close()

if __name__ == "__main__":
    main()
