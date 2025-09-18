import os
from backend.connections.sql_connect import get_connection

def test_connection():
    try:
        print("🔎 Intentando conectar con parámetros:")
        print("Servidor:", os.getenv("SQL_SERVER"))
        print("Base de datos:", os.getenv("SQL_DATABASE"))
        print("Usuario:", os.getenv("SQL_USER"))

        conn = get_connection()
        print("✅ Conexión establecida con éxito")

        cursor = conn.cursor()
        cursor.execute("SELECT TOP 5 name FROM sys.databases;")
        rows = cursor.fetchall()

        print("📂 Bases de datos disponibles:")
        for row in rows:
            print("-", row[0])

        cursor.close()
        conn.close()
    except Exception as e:
        print("❌ Error al conectar:", e)

if __name__ == "__main__":
    test_connection()
