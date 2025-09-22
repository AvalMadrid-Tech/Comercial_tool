import React, { useState } from "react";

function SolicitudDomicilios({ refId }) {
  const [tipoVia, setTipoVia] = useState("");
  const [nombreVia, setNombreVia] = useState("");
  const [numeroVia, setNumeroVia] = useState("");
  const [poblacion, setPoblacion] = useState("");
  const [codPostal, setCodPostal] = useState("");
  const [codPais, setCodPais] = useState("ES");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [predeterminado, setPredeterminado] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!refId) {
      alert("❌ No se ha definido REF_ID. Primero guarda la sociedad.");
      return;
    }

    const payload = {
      REF_ID: refId, 
      TIPO_VIA: tipoVia,
      NOMBRE_VIA: nombreVia,
      NUMERO_VIA: numeroVia,
      POBLACION: poblacion,
      COD_POSTAL: codPostal,
      COD_PAIS: codPais,
      TELEFONO: telefono,
      EMAIL: email,
      PREDETERMINADO: predeterminado,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/api/domicilios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("✅ Respuesta backend:", data);

      if (response.ok) {
        alert("✅ Domicilio creado con éxito");
        // reset form
        setTipoVia("");
        setNombreVia("");
        setNumeroVia("");
        setPoblacion("");
        setCodPostal("");
        setTelefono("");
        setEmail("");
        setPredeterminado(0);
      } else {
        alert("❌ Error al guardar domicilio: " + (data.error || "desconocido"));
      }
    } catch (error) {
      console.error("❌ Error al enviar:", error);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Nuevo Domicilio</h3>
      <input
        type="text"
        placeholder="Tipo de Vía (CL, AV, PZ...)"
        value={tipoVia}
        onChange={(e) => setTipoVia(e.target.value)}
      />
      <input
        type="text"
        placeholder="Nombre de la Vía"
        value={nombreVia}
        onChange={(e) => setNombreVia(e.target.value)}
      />
      <input
        type="text"
        placeholder="Número"
        value={numeroVia}
        onChange={(e) => setNumeroVia(e.target.value)}
      />
      <input
        type="text"
        placeholder="Población"
        value={poblacion}
        onChange={(e) => setPoblacion(e.target.value)}
      />
      <input
        type="text"
        placeholder="Código Postal"
        value={codPostal}
        onChange={(e) => setCodPostal(e.target.value)}
      />
      <input
        type="text"
        placeholder="Código País"
        value={codPais}
        onChange={(e) => setCodPais(e.target.value)}
      />
      <input
        type="text"
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>
        Predeterminado:
        <select
          value={predeterminado}
          onChange={(e) => setPredeterminado(Number(e.target.value))}
        >
          <option value={0}>No</option>
          <option value={1}>Sí</option>
        </select>
      </label>
      <button type="submit">Añadir domicilio</button>
    </form>
  );
}

export default SolicitudDomicilios;
