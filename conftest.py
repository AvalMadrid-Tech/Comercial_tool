import pytest
from backend.app import app  # importa tu Flask app

@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client
