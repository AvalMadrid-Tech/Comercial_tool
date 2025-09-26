import pytest
import json
import requests

from routes.create_contactos import create_contactos_bp
from flask import Flask

@pytest.fixture
def client():
    app = Flask(__name__)
    app.register_blueprint(create_contactos_bp)
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client

def test_create_contacto(client, monkeypatch):
    # Mock de get_connection para no tocar la BBDD real
    class DummyCursor:
        def execute(self, sql, params=None):
            if "MAX(IDCONTACTO)" in sql:
                self._result = [(5671,)]
            else:
                self._result = []
        def fetchone(self): return self._result[0]
        def close(self): pass

    class DummyConn:
        def __init__(self): self.autocommit = True
        def cursor(self): return DummyCursor()
        def commit(self): pass
        def close(self): pass

    monkeypatch.setattr("create_contacto.get_connection", lambda: DummyConn())

payload = {
    "REF_ID": "2800077712",           # el REF_ID de la identidad existente
    "NOMBRE": "Guillermo",
    "APELLIDOS": "Santamaría",
    "TFNO_FIJO": "918018360",
    "TFNO_MOVIL": "689219063",
    "E_MAIL": "guillermo@test.com",
    "CARGO": "Socio",
    "CIT": "14303135X",
    "USUARIO_ALTA": "GSR"             # lo mandas desde sessionStorage
}

r = requests.post("http://localhost:5000/api/contactos", json=payload)
print(r.json())
