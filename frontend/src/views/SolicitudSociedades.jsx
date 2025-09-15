import React, { useState } from "react";

function SolicitudSociedades() {
  const [formData, setFormData] = useState({
    razonSocial: "",
    nombreComercial: "",
    nif: "",
    direccion: "",
    localidad: "",
    cp: "",
    telefono: "",
    movil: "",
    email: "",
    representanteLegal: "",
    cargo: "",
    fechaConstitucion: "",
    fechaInicioActividad: "",
    cnae: "",
    actividad: "",
    importe: "",
    plazo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Solicitud Sociedad:", formData);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h2>Solicitud de Aval Sociedades</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Razón Social:
          <input
            type="text"
            name="razonSocial"
            value={formData.razonSocial}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Nombre Comercial:
          <input
            type="text"
            name="nombreComercial"
            value={formData.nombreComercial}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          NIF:
          <input
            type="text"
            name="nif"
            value={formData.nif}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Dirección:
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Localidad:
          <input
            type="text"
            name="localidad"
            value={formData.localidad}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Código Postal:
          <input
            type="text"
            name="cp"
            value={formData.cp}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Teléfono:
          <input
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Móvil:
          <input
            type="text"
            name="movil"
            value={formData.movil}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Representante Legal:
          <input
            type="text"
            name="representanteLegal"
            value={formData.representanteLegal}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Cargo:
          <input
            type="text"
            name="cargo"
            value={formData.cargo}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Fecha de Constitución:
          <input
            type="date"
            name="fechaConstitucion"
            value={formData.fechaConstitucion}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Fecha de Inicio de Actividad:
          <input
            type="date"
            name="fechaInicioActividad"
            value={formData.fechaInicioActividad}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          CNAE:
          <input
            type="text"
            name="cnae"
            value={formData.cnae}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Actividad:
          <input
            type="text"
            name="actividad"
            value={formData.actividad}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Importe (€):
          <input
            type="number"
            name="importe"
            value={formData.importe}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Plazo (meses):
          <input
            type="number"
            name="plazo"
            value={formData.plazo}
            onChange={handleChange}
          />
        </label>
        <br />

        <button type="submit">Enviar Solicitud</button>
      </form>
    </div>
  );
}

export default SolicitudSociedades;
