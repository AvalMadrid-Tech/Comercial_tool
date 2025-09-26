import pytest
from utils.validators import validar_documento

# -----------------------
# Tests para DNI / NIF (personas físicas)
# -----------------------
def test_validar_documento_nif_valido():
    assert validar_documento("14303135X") is True  # NIF válido

def test_validar_documento_nif_invalido():
    assert validar_documento("14303135A") is False  # Letra incorrecta


# -----------------------
# Tests para NIE
# -----------------------
def test_validar_documento_nie_valido():
    assert validar_documento("X1234567L") is True  # NIE válido

def test_validar_documento_nie_invalido():
    assert validar_documento("Y7654321A") is False  # Letra incorrecta


# -----------------------
# Tests para CIF (empresa)
# -----------------------
@pytest.mark.skip(reason="Consulta real a VIES, requiere internet y CIF válido")
def test_validar_documento_cif_vies():
    """
    Este test consulta el sistema VIES en vivo.
    Ejemplo: CIF intracomunitario de SEAT, S.A. (ESA08017535)
    """
    assert validar_documento("ESA08017535") is True
