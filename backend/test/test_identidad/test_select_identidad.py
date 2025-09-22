# test_select_identidad.py
from connections.sql_connect import get_connection

def buscar_por_cit(cit: str):
    query = """
    SELECT TOP 10 REF_ID, COD_DELEGACION, TITULAR, CIT, F_ALTA, COD_GESTOR
    FROM G3.dbo.IDENTIDADES
    WHERE CIT = ?
    ORDER BY F_ALTA DESC
    """
    with get_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(query, (cit,))
            rows = cursor.fetchall()
            if not rows:
                print(f"❌ No se encontró ninguna identidad con CIT={cit}")
            else:
                print(f"✅ Registros encontrados para CIT={cit}:")
                for row in rows:
                    print(row)

if __name__ == "__main__":
    buscar_por_cit("12345678A")
