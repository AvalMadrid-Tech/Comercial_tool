import React, { useState } from "react";

function SolicitudAutonomos() {
  const [formData, setFormData] = useState({
    nombre: "",
    dni: "",
    direccionNegocio: "",
    direccionParticular: "",
    telefono: "",
    email: "",
    estadoCivil: "",
    regimenMatrimonial: "",
    importe: "",
    plazo: "",
    actividad: "",
    cnae: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h2>Solicitud de Aval Autónomos</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre y Apellidos:
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          DNI/NIE:
          <input
            type="text"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Dirección (Negocio):
          <input
            type="text"
            name="direccionNegocio"
            value={formData.direccionNegocio}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Dirección (Particular):
          <input
            type="text"
            name="direccionParticular"
            value={formData.direccionParticular}
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
          Estado Civil:
          <input
            type="text"
            name="estadoCivil"
            value={formData.estadoCivil}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Régimen Matrimonial:
          <input
            type="text"
            name="regimenMatrimonial"
            value={formData.regimenMatrimonial}
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
          CNAE:
          <input
            type="text"
            name="cnae"
            value={formData.cnae}
            onChange={handleChange}
          />
        </label>
        <br />

        <button type="submit">Enviar Solicitud</button>
      </form>
    </div>
  );
}

export default SolicitudAutonomos;
