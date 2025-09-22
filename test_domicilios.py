import pytest
from backend.connections.sql_connect import get_connection

def test_create_domicilio_integration(client):
    test_ref_id = "2800100001"  # un REF_ID ya existente en IDENTIDADES

    payload = {
        "REF_ID": test_ref_id,
        "COD_TIPODOMICILIO":0,  # usa un tipo distinto para que no choque con existentes
        "TIPO_VIA": "CL",
        "NOMBRE_VIA": "PRUEBA CALLE",
        "NUMERO_VIA": "123",
        "POBLACION": "Ciudad Test",
        "COD_POSTAL": "28080",
        "COD_PAIS": "ES",
        "TELEFONO": "910000000",
        "EMAIL": "test_integration@dominio.com",
        "PREDETERMINADO": 0
    }

    # Paso 1: Llamar al endpoint
    response = client.post("/domicilios", json=payload)
    print("DEBUG RESPONSE:", response.json)
    assert response.status_code == 201
    assert response.json["message"] == "Domicilio creado con éxito"

    # Paso 2: Verificar que se insertó el último domicilio en BBDD
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT TOP 1 REF_ID, NOMBRE_VIA
        FROM dbo.IDENTIDADES_DOMICILIOS
        WHERE REF_ID = ?
        ORDER BY G3_DOMICILIO DESC
    """, test_ref_id)
    row = cursor.fetchone()

    assert row is not None
    assert row.REF_ID == test_ref_id
    assert row.NOMBRE_VIA.strip() == "PRUEBA CALLE"

    cursor.close()
    conn.close()
