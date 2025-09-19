from pydantic import BaseModel, Field, validator
from typing import Optional


class IdentidadIn(BaseModel):
    COD_DELEGACION: str = Field(..., max_length=4)
    TIPO_IDENTIDAD: str = Field(..., max_length=2, pattern="^(F|J)$")
    TITULAR: str = Field(..., max_length=300)
    NOMBRE: str = Field(..., max_length=60)
    APELLIDOS: str = Field(..., max_length=196)
    NOMBRE_COMERCIAL: str = Field(..., max_length=160)
    PAIS_NIF: str = Field(..., max_length=4)
    CIT: str = Field(..., max_length=40)
    WEB: Optional[str] = Field(None, max_length=400)
    ACTIVIDAD: str = Field(..., max_length=2000)
    COD_GESTOR: str = Field(..., max_length=20)
    VALIDEZ_DATOS: str = Field(..., max_length=2)
    PROCESO_ALTA: str = Field(..., max_length=4)
    F_ALTA: str = Field(..., max_length=16)   # se guarda como nvarchar(16)
    COD_SOPORTE: int = 1
    ID_OBSERVACION: int = 0
    REGIMEN_ECONOMICO: str = Field(..., max_length=2)
    DATOS_REGISTRALES: Optional[str] = Field(" ", max_length=4000)
    F_CONSTITUCION: str = Field(..., max_length=16)  # se guarda como nvarchar(16)
    EXPORTA: str = Field("N", max_length=2)
    NIVEL_COMPLETITUD: int = 1
    CLASIF_PYME: str = Field(..., max_length=2)
    G3_BLOQUEO: str = Field("X", max_length=2)
    COD_CNAE: str = Field(..., max_length=10)
    DECLARAR_ASNEF: str = Field("S", max_length=2)
    NUM_SS: Optional[str] = Field(None, max_length=40)
    EXP_EXTERNO_WEB: Optional[str] = Field(None, max_length=100)
    F_CADUCIDAD_CIT: Optional[str] = Field(None, max_length=16)
    PERSONA_RESPONSABILIDAD_PUBLICA: str = Field(..., max_length=2)
    IDIOMA: str = Field("S", max_length=2)  # ⚠️ en SQL es nvarchar(2)
    WEB_IDENTIDAD: Optional[int] = 0
    WEB_USUARIO: int = 0
    PAIS_NACIONALIDAD: str = Field(..., max_length=4)
    CLASIF_PYME_METODO: str = Field("A", max_length=2)

    # 🔹 Validadores
    @validator("EXPORTA", "VALIDEZ_DATOS", "G3_BLOQUEO", "PERSONA_RESPONSABILIDAD_PUBLICA", pre=True)
    def normalizar_flags(cls, v):
        """Normaliza flags de 1-2 caracteres en mayúsculas"""
        if not v:
            return "N"
        return v.strip().upper()[:2]

    @validator("DECLARAR_ASNEF", pre=True)
    def normalizar_asnef(cls, v):
        """Normaliza SI/NO a S/N"""
        if not v:
            return "N"
        v = v.strip().upper()
        if v in ["S", "SI", "Y", "YES"]:
            return "S"
        if v in ["N", "NO"]:
            return "N"
        return v[:1]

    @validator("IDIOMA", pre=True)
    def normalizar_idioma(cls, v):
        """Forzar a 2 letras en mayúscula"""
        if not v:
            return "ES"
        return v.strip().upper()[:2]

    @validator("COD_CNAE", "CIT", "COD_DELEGACION", "PAIS_NIF", "PAIS_NACIONALIDAD", pre=True)
    def strip_upper(cls, v):
        """Quita espacios y pone mayúsculas en códigos"""
        if v is None:
            return v
        return v.strip().upper()


# 👉 Modelo de salida
class IdentidadOut(IdentidadIn):
    REF_ID: str
    G3_IDENTIDAD: Optional[int]   # generado en SQL Server
    G3_CONTROL: str
