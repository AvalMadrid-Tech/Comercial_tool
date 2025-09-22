from connections.sql_connect import get_connection

def debug_identidad(cit):
    conn = get_connection()
    cursor = conn.cursor()

    # Confirmar base activa
    cursor.execute("SELECT DB_NAME()")
    print("📂 Base activa:", cursor.fetchone()[0])

    # Confirmar esquema de la tabla
    cursor.execute("""
        SELECT s.name AS schema_name, t.name AS table_name
        FROM sys.tables t
        JOIN sys.schemas s ON t.schema_id = s.schema_id
        WHERE t.name = 'IDENTIDADES'
    """)
    print("📌 Tablas IDENTIDADES encontradas:")
    for row in cursor.fetchall():
        print(f"   - {row.schema_name}.{row.table_name}")

    # Buscar el CIT directamente
    cursor.execute("SELECT TOP 5 REF_ID, CIT, COD_DELEGACION, TITULAR, F_ALTA FROM IDENTIDADES WHERE CIT = ?", (cit,))
    rows = cursor.fetchall()
    print("📊 Resultados para CIT", cit, ":", rows)

if __name__ == "__main__":
    debug_identidad("14303135X")
