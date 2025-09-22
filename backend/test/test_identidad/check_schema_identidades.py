from connections.sql_connect import get_connection

def check_schema_identidades():
    with get_connection() as conn:
        with conn.cursor() as cursor:
            # Nombre de la base activa
            cursor.execute("SELECT DB_NAME()")
            db_name = cursor.fetchone()[0]

            # Nombre del esquema + existencia de la tabla IDENTIDADES
            cursor.execute("""
                SELECT t.name AS TableName, s.name AS SchemaName
                FROM sys.tables t
                JOIN sys.schemas s ON t.schema_id = s.schema_id
                WHERE t.name = 'IDENTIDADES'
            """)
            rows = cursor.fetchall()

            print(f"📂 Base de datos activa: {db_name}")
            if rows:
                print("📌 Tablas IDENTIDADES encontradas:")
                for r in rows:
                    print(f"   - {r.SchemaName}.{r.TableName}")
            else:
                print("⚠️ No se encontró ninguna tabla llamada IDENTIDADES en esta base.")

            # Últimos registros insertados (para confirmar)
            cursor.execute("""
                SELECT TOP 5 REF_ID, COD_DELEGACION, TITULAR, CIT, F_ALTA, COD_GESTOR, G3_CONTROL
                FROM IDENTIDADES
                ORDER BY F_ALTA DESC
            """)
            result = cursor.fetchall()
            print("\n📊 Últimos registros en la tabla IDENTIDADES:")
            for row in result:
                print(row)

if __name__ == "__main__":
    check_schema_identidades()
