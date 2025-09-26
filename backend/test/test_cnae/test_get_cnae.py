from connections.sql_connect import get_connection

def test_cnae():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT TOP 5 COD_CNAE, DESCRI_CNAE FROM T_BE_CNAE")
    rows = cursor.fetchall()
    conn.close()

    for row in rows:
        print(f"{row[0]} - {row[1]}")

if __name__ == "__main__":
    test_cnae()
