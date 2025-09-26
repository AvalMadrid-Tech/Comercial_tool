import requests

# -----------------------------
# Validador DNI / NIE / NIF persona física
# -----------------------------
def validar_cit(cit: str) -> bool:
    """
    Valida si un DNI o NIE español tiene formato correcto y letra de control válida.
    Retorna True si es válido, False si no.
    """
    if not cit:
        return False

    cit = cit.upper().strip()
    letras = "TRWAGMYFPDXBNJZSQVHLCKE"

    # --- NIF (DNI con letra) ---
    if len(cit) == 9 and cit[:-1].isdigit() and cit[-1].isalpha():
        numero = int(cit[:-1])
        letra = cit[-1]
        return letras[numero % 23] == letra

    # --- NIE (extranjeros) ---
    if len(cit) == 9 and cit[0] in "XYZ" and cit[1:-1].isdigit() and cit[-1].isalpha():
        sustituto = {"X": "0", "Y": "1", "Z": "2"}
        numero = int(sustituto[cit[0]] + cit[1:-1])
        letra = cit[-1]
        return letras[numero % 23] == letra

    return False


# -----------------------------
# Validador CIF vía VIES (solo empresas registradas)
# -----------------------------
def validar_cif_vies(cif: str, country_code="ES") -> bool:
    """
    Valida un CIF/NIF en el sistema VIES (solo empresas registradas en operaciones intracomunitarias).
    Retorna True si el número es válido y está dado de alta en la UE, False en caso contrario.
    """
    try:
        url = "https://ec.europa.eu/taxation_customs/vies/services/checkVatService"
        payload = f"""
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                          xmlns:urn="urn:ec.europa.eu:taxud:vies:services:checkVat:types">
           <soapenv:Header/>
           <soapenv:Body>
              <urn:checkVat>
                 <urn:countryCode>{country_code}</urn:countryCode>
                 <urn:vatNumber>{cif}</urn:vatNumber>
              </urn:checkVat>
           </soapenv:Body>
        </soapenv:Envelope>
        """
        headers = {"Content-Type": "text/xml"}
        response = requests.post(url, data=payload.encode("utf-8"), headers=headers, timeout=10)

        return "<valid>true</valid>" in response.text.lower()
    except Exception:
        return False


# -----------------------------
# Validador unificado
# -----------------------------
def validar_documento(doc: str) -> bool:
    """
    Valida un documento español (DNI, NIE, NIF de persona física o CIF de empresa).
    - Si empieza por número o X/Y/Z → valida como DNI/NIE/NIF de persona.
    - Si empieza por letra distinta de X/Y/Z → intenta validar como CIF en VIES.
    """
    if not doc:
        return False

    doc = doc.strip().upper()

    # Persona física: DNI/NIE/NIF
    if doc[0].isdigit() or doc[0] in "XYZ":
        return validar_cit(doc)

    # Empresa: CIF/NIF de persona jurídica
    return validar_cif_vies(doc, country_code="ES")
