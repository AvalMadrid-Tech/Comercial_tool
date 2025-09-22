from connections.sql_connect import get_connection

def delete_identidad(cit):
    try:
        with get_connection() as conn:
            with conn.cursor() as cursor:
                # Comprobamos cuántos registros hay con ese CIT
                cursor.execute("SELECT COUNT(*) FROM IDENTIDADES WHERE CIT = ?", (cit,))
                count = cursor.fetchone()[0]
                print(f"🔎 Registros encontrados con CIT={cit}: {count}")

                if count == 0:
                    print("✅ No hay registros que eliminar.")
                    return

                # Eliminamos
                cursor.execute("DELETE FROM IDENTIDADES WHERE CIT = ?", (cit,))
                conn.commit()
                print(f"🗑️ Registros eliminados correctamente: {count}")

    except Exception as e:
        print("❌ Error al eliminar:", e)

if __name__ == "__main__":
    delete_identidad("14303135x")
