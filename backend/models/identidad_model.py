from pydantic import BaseModel, Field
from typing import Optional
from datetime import date

class IdentidadIn(BaseModel):
    COD_DELEGACION: str = Field(..., max_length=4)
    TIPO_IDENTIDAD: str = Field(..., pattern="^(F|J)$", max_length=2)
    TITULAR: str = Field(..., max_length=30)
    NOMBRE: str = Field(..., max_length=60)
    APELLIDOS: str = Field(..., max_length=60)
    NOMBRE_COMERCIAL: str = Field(..., max_length=160)
    PAIS_NIF: str = Field(..., max_length=20)
    CIT: str = Field(..., max_length=80)
    WEB: Optional[str] = Field(None, max_length=200)
    ACTIVIDAD: str = Field(..., max_length=30)
    COD_GESTOR: str = Field(..., max_length=4)
    VALIDEZ_DATOS: str = Field(..., max_length=1)
    PROCESO_ALTA: str = Field(..., max_length=2)
    F_ALTA: date
    COD_SOPORTE: int = 1
    ID_OBSERVACION: int = 0
    REGIMEN_ECONOMICO: str = Field(..., max_length=2)
    DATOS_REGISTRALES: str = Field(..., max_length=200)
    F_CONSTITUCION: date
    EXPORTA: str = Field("N", max_length=1)
    NIVEL_COMPLETITUD: int = 0
    CLASIF_PYME: str = Field(..., max_length=1)
    G3_BLOQUEO: str = Field("X", max_length=1)
    COD_CNAE: str = Field(..., max_length=6)
    DECLARAR_ASNEF: str = Field("SI", max_length=2)
    NUM_SS: Optional[str] = Field(None, max_length=12)
    EXP_EXTERNO_WEB: Optional[str] = Field(None, max_length=200)
    F_CADUCIDAD_CIT: Optional[date] = None
    PERSONA_RESPONSABILIDAD_PUBLICA: str = Field(..., max_length=1)
    IDIOMA: str = Field("S", max_length=1)
    WEB_IDENTIDAD: Optional[str] = Field(None, max_length=200)
    WEB_USUARIO: int = 0
    PAIS_NACIONALIDAD: str = Field(..., max_length=20)
    CLASIF_PYME_METODO: str = Field("A", max_length=1)


# 👉 Modelo de salida (incluye REF_ID y G3_IDENTIDAD generados)
class IdentidadOut(IdentidadIn):
    REF_ID: str
    G3_IDENTIDAD: int
    G3_CONTROL: str

