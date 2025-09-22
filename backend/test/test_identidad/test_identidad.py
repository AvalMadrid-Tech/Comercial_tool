import requests

url = "http://127.0.0.1:5000/api/identidades"

payload = {
    "COD_DELEGACION": "28",
    "TIPO_IDENTIDAD": "F",
    "TITULAR": "Juan Pérez",
    "NOMBRE": "Juan",
    "APELLIDOS": "Pérez García",
    "NOMBRE_COMERCIAL": "Consultoría JP",
    "PAIS_NIF": "ES",
    "CIT": "14303135x",   # 👈 si quieres probar duplicado, cambia este valor
    "ACTIVIDAD": "Consultoría tecnológica",
    "COD_CNAE": "6201",
    "REGIMEN_ECONOMICO": "S",
    "COD_GESTOR": "GSR",
    "VALIDEZ_DATOS": "S",
    "PROCESO_ALTA": "GE",
    "F_ALTA": "2025-09-19",
    "F_CONSTITUCION": "2023-09-19",
    "CLASIF_PYME": "S",
    "PERSONA_RESPONSABILIDAD_PUBLICA": "N",
    "PAIS_NACIONALIDAD": "ES",
    "DATOS_REGISTRALES": " "
}

headers = {"Content-Type": "application/json"}

response = requests.post(url, json=payload, headers=headers)

print(f"➡️ Status code: {response.status_code}")
try:
    print(f"📦 Respuesta JSON: {response.json()}")
except Exception:
    print(f"📜 Respuesta texto: {response.text}")
