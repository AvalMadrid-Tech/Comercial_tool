import React, { useState } from "react";
import SolicitudSociedades from "../components/SolicitudIdentidad";
import SolicitudDomicilios from "../components/Solicituddomicilios";

function SolicitudSociedadesView() {
  const [refId, setRefId] = useState("");
  const [sociedadGuardada, setSociedadGuardada] = useState(false);

  const handleSociedadGuardada = (nuevoRefId) => {
    setRefId(nuevoRefId);
    setSociedadGuardada(true);
  };

  return (
    <div>
      <h1>Gestión de Sociedades y Domicilios</h1>

      {/* Paso 1: crear sociedad */}
      <SolicitudSociedades onGuardado={handleSociedadGuardada} />

      {/* Paso 2: mostrar domicilios si la sociedad está guardada */}
      {sociedadGuardada && (
        <div style={{ marginTop: "2rem" }}>
          <hr />
          <h2>Domicilios de la Sociedad</h2>
          <SolicitudDomicilios refId={refId} />
        </div>
      )}
    </div>
  );
}

export default SolicitudSociedadesView;
