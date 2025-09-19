import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";

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

  const [message, setMessage] = useState("");
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Payload mínimo con algunos defaults para que no falle
      const payload = {
        // Datos del formulario
        TITULAR: formData.nombre,
        NOMBRE: formData.nombre.split(" ")[0] || formData.nombre,
        APELLIDOS: formData.nombre.split(" ").slice(1).join(" ") || "",
        CIT: formData.dni,
        ACTIVIDAD: formData.actividad,
        COD_CNAE: formData.cnae,
        REGIMEN_ECONOMICO: formData.regimenMatrimonial,

        // Valores mínimos requeridos
        COD_DELEGACION: "001",
        TIPO_IDENTIDAD: "F",

        // Fechas → formato ISO (el backend las convertirá a YYYYMMDD)
        F_ALTA: new Date().toISOString().split("T")[0],
        F_CONSTITUCION: new Date().toISOString().split("T")[0],

        // Defaults críticos (evitan error en IdentidadIn)
        COD_SOPORTE: 1,
        ID_OBSERVACION: 0,
        PAIS_NIF: "ES",
        COD_GESTOR: "WEB",
        VALIDEZ_DATOS: "S",
        PROCESO_ALTA: "WEB",
        EXPORTA: "N",
        NIVEL_COMPLETITUD: 0,
        CLASIF_PYME: "S",
        G3_BLOQUEO: "X",
        IDIOMA: "S",

        // Campos opcionales / que backend completa con DEFAULTS
        NOMBRE_COMERCIAL: formData.actividad || " ",
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


      console.log("📤 Enviando payload:", payload);

      const res = await axios.post("http://127.0.0.1:5000/api/identidades", payload);

      if (res.status === 201) {
        setMessage("✅ Solicitud creada con éxito. REF_ID: " + res.data.REF_ID);

        setTimeout(() => {
          navigate("/alta"); 
        }, 1500);
      } else {
        setMessage("⚠️ Algo raro pasó. Código: " + res.status);
      }
    } catch (err) {
      console.error("❌ Error en solicitud:", err);
      setMessage(
        "❌ Error: " +
          (err.response?.status || "") +
          " - " +
          (err.response?.data?.error || err.message)
      );
    }
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
            required
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
            required
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

      {message && <p>{message}</p>}
    </div>
  );
}

export default SolicitudAutonomos;
