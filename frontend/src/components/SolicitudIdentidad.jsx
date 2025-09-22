import React, { useState } from "react";

function SolicitudIdentidad({ onGuardado }) {
  const [titular, setTitular] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [nombreComercial, setNombreComercial] = useState("");
  const [cit, setCit] = useState("");
  const [actividad, setActividad] = useState("");
  const [codCnae, setCodCnae] = useState("");
  const [fechaConstitucion, setFechaConstitucion] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const codGestor = sessionStorage.getItem("usuario") || "WEB";

    const payload = {
      TITULAR: titular,
      NOMBRE: nombre,
      APELLIDOS: apellidos,
      NOMBRE_COMERCIAL: nombreComercial,
      CIT: cit,
      ACTIVIDAD: actividad,
      COD_CNAE: codCnae,
      COD_DELEGACION: "28",
      TIPO_IDENTIDAD: "J", // Sociedades → J
      REGIMEN_ECONOMICO: "S",
      F_ALTA: new Date().toISOString().split("T")[0],
      F_CONSTITUCION: fechaConstitucion,
      COD_SOPORTE: 1,
      ID_OBSERVACION: 0,
      PAIS_NIF: "ES",
      COD_GESTOR: codGestor, // del sessionStorage
      VALIDEZ_DATOS: "S",
      PROCESO_ALTA: "GE", // 🔹 corregido
      EXPORTA: "N",
      NIVEL_COMPLETITUD: 0,
      CLASIF_PYME: "S",
      G3_BLOQUEO: "X",
      IDIOMA: "S",
      DATOS_REGISTRALES: " ",
      NUM_SS: " ",
      EXP_EXTERNO_WEB: " ",
      WEB: " ",
      WEB_IDENTIDAD: 0,
      WEB_USUARIO: 0,
      CLASIF_PYME_METODO: "A",
      DECLARAR_ASNEF: "N",
      PERSONA_RESPONSABILIDAD_PUBLICA: "N",
      PAIS_NACIONALIDAD: "ES",
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/api/identidades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("✅ Respuesta backend:", data);

      if (response.ok) {
        alert("✅ Sociedad guardada con éxito");
        if (onGuardado && data.REF_ID) {
          onGuardado(data.REF_ID); // devolvemos REF_ID al padre
        }
      } else {
        alert("❌ Error al guardar: " + (data.error || "desconocido"));
      }
    } catch (error) {
      console.error("❌ Error al enviar:", error);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Solicitud Sociedades</h2>
      <input type="text" placeholder="Titular" value={titular} onChange={(e) => setTitular(e.target.value)} />
      <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <input type="text" placeholder="Apellidos" value={apellidos} onChange={(e) => setApellidos(e.target.value)} />
      <input type="text" placeholder="Nombre Comercial" value={nombreComercial} onChange={(e) => setNombreComercial(e.target.value)} />
      <input type="text" placeholder="CIT" value={cit} onChange={(e) => setCit(e.target.value)} />
      <input type="text" placeholder="Actividad" value={actividad} onChange={(e) => setActividad(e.target.value)} />
      <input type="text" placeholder="Código CNAE" value={codCnae} onChange={(e) => setCodCnae(e.target.value)} />
      <input type="date" placeholder="Fecha Constitución" value={fechaConstitucion} onChange={(e) => setFechaConstitucion(e.target.value)} />
      <button type="submit">Enviar</button>
    </form>
  );
}

export default SolicitudIdentidad;
