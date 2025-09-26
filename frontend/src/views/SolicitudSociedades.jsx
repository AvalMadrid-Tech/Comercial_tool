import { useState } from "react";
import {
  Accordion,
  Button,
  Form,
  Row,
  Col,
  Card,
  Container,
} from "react-bootstrap";

function SociedadForm() {
  // ================== ESTADO PRINCIPAL ==================
  const [formData, setFormData] = useState({
    // Página 1: Solicitante
    razonSocial: "",
    nombreComercial: "",
    nif: "",
    formaJuridica: "",
    fechaConstitucion: "",
    registroMercantil: "",
    domicilio: "",
    localidad: "",
    provincia: "",
    cp: "",
    telefono: "",
    movil: "",
    email: "",
    web: "",
    numSeguridadSocial: "",
    representanteLegal: "",
    dniRepresentante: "",
    cargoRepresentante: "",
    personaContacto: "",
    telefonosContacto: "",

    // Página 2: Accionistas
    accionistas: [],

    // Página 3: Empresas vinculadas
    empresas: [],

    // Página 4: Operación
    tipoOperacion: "",
    tipoOperacionOtros: "",
    detalleOperacion: "",
    importeOperacion: "",
    plazoOperacion: "",
    entidadFinanciera: "",
    sucursalOperacion: "",

    // Página 5: Actividad y Garantías
    cnaePrincipal: "",
    descripcionActividad: "",
    locales: [],
    plantillaFijos: 0,
    plantillaEventuales: 0,
    plantillaAutonomos: 0,
    plantillaTotal: 0,
    prevision1: 0,
    prevision2: 0,
    prevision3: 0,
    garantiaHipotecaria: "",
    garantiaFiadores: "",
    garantiaOtras: "",
    comoConocio: "",

    // Página 6: Actividad general
    actividadPrincipal: "",
    cnae: "",
    fechaInicioActividad: "",
    empleados: "",
    facturacionAnual: "",
    sector: "",

    // Página 7: Observaciones
    observaciones: "",
    anexo1: "",
    anexo2: "",
    anexo3: "",
  });

  // ================== REPRESENTANTES ==================
  const [representantes, setRepresentantes] = useState([
    { nombre: "", dni: "", cargo: "", domicilio: "", telefono: "", email: "" },
  ]);

  // ================== HANDLERS ==================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRepChange = (index, e) => {
    const newReps = [...representantes];
    newReps[index][e.target.name] = e.target.value;
    setRepresentantes(newReps);
  };

  const addRepresentante = () => {
    setRepresentantes([
      ...representantes,
      { nombre: "", dni: "", cargo: "", domicilio: "", telefono: "", email: "" },
    ]);
  };

  const removeRepresentante = (index) => {
    setRepresentantes(representantes.filter((_, i) => i !== index));
  };

  // Helpers para arrays (accionistas, empresas, locales)
  const addItem = (field) => {
    const newItem =
      field === "accionistas"
        ? { nombre: "", dni: "", importe: "", participacion: "" }
        : field === "empresas"
        ? { razonSocial: "", nif: "", participacion: "", trabajadores: "", grupo: "" }
        : field === "locales"
        ? { direccion: "", localidad: "", superficie: "", tipo: "", valor: "" }
        : {};
    setFormData({ ...formData, [field]: [...formData[field], newItem] });
  };

  const handleArrayChange = (e, index, field) => {
    const updated = [...formData[field]];
    updated[index][e.target.name] = e.target.value;
    setFormData({ ...formData, [field]: updated });
  };

  const updateRadioValue = (field, index, key, value) => {
    const updated = [...formData[field]];
    updated[index][key] = value;
    setFormData({ ...formData, [field]: updated });
  };

  // ================== GUARDAR Y PDF ==================
  const handleGuardar = async () => {
    const payload = { ...formData, representantes };
    await fetch("http://localhost:5000/sociedades", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    alert("Guardado en BBDD ✅");
  };

  const handleDescargarPDF = async () => {
    const payload = { ...formData, representantes };
    const response = await fetch("http://localhost:5000/sociedades/pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "solicitud_sociedades.pdf";
    a.click();
  };

  return (
    <Container className="mt-4 p-4 bg-light rounded shadow">
      <h2 className="text-center text-primary mb-4">
        Solicitud de Sociedades
      </h2>

      <Accordion defaultActiveKey="0">
        {/* Página 1 */}
      <Accordion.Item eventKey="0">
        <Accordion.Header>Solicitante</Accordion.Header>
        <Accordion.Body>
          <Row>
            <Col md={8}>
              <Form.Group className="mb-3">
                <Form.Label>Razón Social</Form.Label>
                <Form.Control
                  type="text"
                  name="razonSocial"
                  value={formData.razonSocial}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>NIF</Form.Label>
                <Form.Control
                  type="text"
                  name="nif"
                  value={formData.nif}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={8}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre Comercial</Form.Label>
                <Form.Control
                  type="text"
                  name="nombreComercial"
                  value={formData.nombreComercial}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Web</Form.Label>
                <Form.Control
                  type="text"
                  name="web"
                  value={formData.web}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Localidad</Form.Label>
                <Form.Control
                  type="text"
                  name="localidad"
                  value={formData.localidad}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Código Postal</Form.Label>
                <Form.Control
                  type="text"
                  name="cp"
                  value={formData.cp}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Fecha de Constitución</Form.Label>
                <Form.Control
                  type="date"
                  name="fechaConstitucion"
                  value={formData.fechaConstitucion}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Fecha de Inicio Actividad</Form.Label>
                <Form.Control
                  type="date"
                  name="fechaInicioActividad"
                  value={formData.fechaInicioActividad}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="text"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Móvil</Form.Label>
                <Form.Control
                  type="text"
                  name="movil"
                  value={formData.movil}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Nº Seguridad Social</Form.Label>
                <Form.Control
                  type="text"
                  name="numSeguridadSocial"
                  value={formData.numSeguridadSocial}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Representante Legal</Form.Label>
                <Form.Control
                  type="text"
                  name="representanteLegal"
                  value={formData.representanteLegal}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>DNI/NIE</Form.Label>
                <Form.Control
                  type="text"
                  name="dniRepresentante"
                  value={formData.dniRepresentante}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Cargo</Form.Label>
                <Form.Control
                  type="text"
                  name="cargoRepresentante"
                  value={formData.cargoRepresentante}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Persona de Contacto</Form.Label>
                <Form.Control
                  type="text"
                  name="personaContacto"
                  value={formData.personaContacto}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Teléfonos</Form.Label>
                <Form.Control
                  type="text"
                  name="telefonosContacto"
                  value={formData.telefonosContacto}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
      <Accordion.Header>Accionistas</Accordion.Header>
      <Accordion.Body>
        {formData.accionistas.map((accionista, index) => (
          <div key={index} className="border p-3 mb-3 rounded">
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre y apellidos / Razón Social</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={accionista.nombre}
                    onChange={(e) => handleArrayChange(e, index, "accionistas")}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>DNI / NIE / NIF</Form.Label>
                  <Form.Control
                    type="text"
                    name="dni"
                    value={accionista.dni}
                    onChange={(e) => handleArrayChange(e, index, "accionistas")}
                  />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group className="mb-3">
                  <Form.Label>Importe</Form.Label>
                  <Form.Control
                    type="number"
                    name="importe"
                    value={accionista.importe}
                    onChange={(e) => handleArrayChange(e, index, "accionistas")}
                  />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group className="mb-3">
                  <Form.Label>% Participación</Form.Label>
                  <Form.Control
                    type="number"
                    name="participacion"
                    value={accionista.participacion}
                    onChange={(e) => handleArrayChange(e, index, "accionistas")}
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
        ))}
        <Button variant="outline-primary" onClick={() => addItem("accionistas")}>
          + Añadir Accionista
        </Button>
      </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="2">
      <Accordion.Header>Empresas Asociadas y Vinculadas</Accordion.Header>
      <Accordion.Body>
        {formData.empresas.map((empresa, index) => (
          <div key={index} className="border p-3 mb-3 rounded">
            <Row>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Razón Social</Form.Label>
                  <Form.Control
                    type="text"
                    name="razonSocial"
                    value={empresa.razonSocial}
                    onChange={(e) => handleArrayChange(e, index, "empresas")}
                  />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group className="mb-3">
                  <Form.Label>NIF</Form.Label>
                  <Form.Control
                    type="text"
                    name="nif"
                    value={empresa.nif}
                    onChange={(e) => handleArrayChange(e, index, "empresas")}
                  />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group className="mb-3">
                  <Form.Label>% Participación</Form.Label>
                  <Form.Control
                    type="number"
                    name="participacion"
                    value={empresa.participacion}
                    onChange={(e) => handleArrayChange(e, index, "empresas")}
                  />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group className="mb-3">
                  <Form.Label>Nº Trabajadores</Form.Label>
                  <Form.Control
                    type="number"
                    name="trabajadores"
                    value={empresa.trabajadores}
                    onChange={(e) => handleArrayChange(e, index, "empresas")}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Grupo Económico</Form.Label>
                  <div>
                    <Form.Check
                      inline
                      label="Sí"
                      type="radio"
                      name={`grupo_${index}`}
                      checked={empresa.grupo === "Sí"}
                      onChange={() =>
                        updateRadioValue("empresas", index, "grupo", "Sí")
                      }
                    />
                    <Form.Check
                      inline
                      label="No"
                      type="radio"
                      name={`grupo_${index}`}
                      checked={empresa.grupo === "No"}
                      onChange={() =>
                        updateRadioValue("empresas", index, "grupo", "No")
                      }
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>
          </div>
        ))}
        <Button variant="outline-primary" onClick={() => addItem("empresas")}>
          + Añadir Empresa
        </Button>
      </Accordion.Body>
    </Accordion.Item>

      <Accordion.Item eventKey="3">
        <Accordion.Header>Operación Solicitada</Accordion.Header>
        <Accordion.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Tipo de operación</Form.Label>
                <Form.Select
                  name="tipoOperacion"
                  value={formData.tipoOperacion}
                  onChange={handleChange}
                >
                  <option value="">Seleccione...</option>
                  <option value="PRESTAMO">PRÉSTAMO</option>
                  <option value="LEASING">LEASING</option>
                  <option value="LINEA DE AVALES">LÍNEA DE AVALES</option>
                  <option value="MONOAVAL">MONOAVAL</option>
                  <option value="POLIZA DE CREDITO">PÓLIZA DE CRÉDITO</option>
                  <option value="OTROS">OTROS</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>En caso de "Otros", descríbalo</Form.Label>
                <Form.Control
                  type="text"
                  name="tipoOperacionOtros"
                  value={formData.tipoOperacionOtros}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Describa en detalle la operación solicitada</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="detalleOperacion"
              value={formData.detalleOperacion}
              onChange={handleChange}
            />
          </Form.Group>

          <Row>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Importe (€)</Form.Label>
                <Form.Control
                  type="number"
                  name="importeOperacion"
                  value={formData.importeOperacion}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Plazo (meses)</Form.Label>
                <Form.Control
                  type="number"
                  name="plazoOperacion"
                  value={formData.plazoOperacion}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Entidad Financiera</Form.Label>
                <Form.Control
                  type="text"
                  name="entidadFinanciera"
                  value={formData.entidadFinanciera}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Nº Sucursal</Form.Label>
                <Form.Control
                  type="text"
                  name="sucursalOperacion"
                  value={formData.sucursalOperacion}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4">
        <Accordion.Header>Actividad y Garantías</Accordion.Header>
        <Accordion.Body>
          {/* CNAE y descripción */}
          <Row>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>CNAE Principal</Form.Label>
                <Form.Control
                  type="text"
                  name="cnaePrincipal"
                  value={formData.cnaePrincipal}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={9}>
              <Form.Group className="mb-3">
                <Form.Label>Descripción de la Actividad</Form.Label>
                <Form.Control
                  type="text"
                  name="descripcionActividad"
                  value={formData.descripcionActividad}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Naves, locales, oficinas */}
          <h6>Naves, Locales, Oficinas y Terrenos Afectos a la Actividad</h6>
          {formData.locales.map((local, index) => (
            <div key={index} className="border p-3 mb-3 rounded">
              <Row>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control
                      type="text"
                      name="direccion"
                      value={local.direccion}
                      onChange={(e) => handleArrayChange(e, index, "locales")}
                    />
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group className="mb-3">
                    <Form.Label>Localidad</Form.Label>
                    <Form.Control
                      type="text"
                      name="localidad"
                      value={local.localidad}
                      onChange={(e) => handleArrayChange(e, index, "locales")}
                    />
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group className="mb-3">
                    <Form.Label>Superficie (m²)</Form.Label>
                    <Form.Control
                      type="number"
                      name="superficie"
                      value={local.superficie}
                      onChange={(e) => handleArrayChange(e, index, "locales")}
                    />
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group className="mb-3">
                    <Form.Label>Propio/Alquilado</Form.Label>
                    <Form.Select
                      name="tipo"
                      value={local.tipo}
                      onChange={(e) => handleArrayChange(e, index, "locales")}
                    >
                      <option value="">Seleccione...</option>
                      <option value="Propio">Propio</option>
                      <option value="Alquilado">Alquilado</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>Valor Mercado / Renta Anual</Form.Label>
                    <Form.Control
                      type="number"
                      name="valor"
                      value={local.valor}
                      onChange={(e) => handleArrayChange(e, index, "locales")}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          ))}
          <Button variant="outline-primary" onClick={() => addItem("locales")}>
            + Añadir Local
          </Button>

          <hr />

          {/* Plantilla actual y previsión */}
          <h6>Plantilla</h6>
          <Row>
            <Col md={2}>
              <Form.Group className="mb-3">
                <Form.Label>Fijos</Form.Label>
                <Form.Control
                  type="number"
                  name="plantillaFijos"
                  value={formData.plantillaFijos}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group className="mb-3">
                <Form.Label>Eventuales</Form.Label>
                <Form.Control
                  type="number"
                  name="plantillaEventuales"
                  value={formData.plantillaEventuales}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group className="mb-3">
                <Form.Label>Autónomos</Form.Label>
                <Form.Control
                  type="number"
                  name="plantillaAutonomos"
                  value={formData.plantillaAutonomos}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group className="mb-3">
                <Form.Label>Total</Form.Label>
                <Form.Control
                  type="number"
                  name="plantillaTotal"
                  value={formData.plantillaTotal}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group className="mb-3">
                <Form.Label>Previsión Año 1</Form.Label>
                <Form.Control
                  type="number"
                  name="prevision1"
                  value={formData.prevision1}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group className="mb-3">
                <Form.Label>Previsión Año 2</Form.Label>
                <Form.Control
                  type="number"
                  name="prevision2"
                  value={formData.prevision2}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group className="mb-3">
                <Form.Label>Previsión Año 3</Form.Label>
                <Form.Control
                  type="number"
                  name="prevision3"
                  value={formData.prevision3}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <hr />

          {/* Garantías */}
          <h6>Garantías Ofrecidas</h6>
          <Form.Group className="mb-3">
            <Form.Label>Hipotecaria</Form.Label>
            <Form.Control
              type="text"
              name="garantiaHipotecaria"
              value={formData.garantiaHipotecaria}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Fiadores</Form.Label>
            <Form.Control
              type="text"
              name="garantiaFiadores"
              value={formData.garantiaFiadores}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Otras</Form.Label>
            <Form.Control
              type="text"
              name="garantiaOtras"
              value={formData.garantiaOtras}
              onChange={handleChange}
            />
          </Form.Group>

          <hr />

          {/* Avalmadrid */}
          <Form.Group className="mb-3">
            <Form.Label>¿Cómo ha conocido Avalmadrid?</Form.Label>
            <Form.Control
              type="text"
              name="comoConocio"
              value={formData.comoConocio}
              onChange={handleChange}
            />
          </Form.Group>
        </Accordion.Body>
      </Accordion.Item>


        {/* Página 2 */}
        <Accordion.Item eventKey="5">
          <Accordion.Header>Representantes</Accordion.Header>
          <Accordion.Body>
            {representantes.map((rep, index) => (
              <Card key={index} className="mb-3 border border-primary">
                <Card.Body>
                  <h5 className="text-primary">Representante {index + 1}</h5>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-2">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                          type="text"
                          name="nombre"
                          value={rep.nombre}
                          onChange={(e) => handleRepChange(index, e)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-2">
                        <Form.Label>DNI</Form.Label>
                        <Form.Control
                          type="text"
                          name="dni"
                          value={rep.dni}
                          onChange={(e) => handleRepChange(index, e)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-2">
                        <Form.Label>Cargo</Form.Label>
                        <Form.Control
                          type="text"
                          name="cargo"
                          value={rep.cargo}
                          onChange={(e) => handleRepChange(index, e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-2">
                        <Form.Label>Domicilio</Form.Label>
                        <Form.Control
                          type="text"
                          name="domicilio"
                          value={rep.domicilio}
                          onChange={(e) => handleRepChange(index, e)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-2">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control
                          type="text"
                          name="telefono"
                          value={rep.telefono}
                          onChange={(e) => handleRepChange(index, e)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-2">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={rep.email}
                          onChange={(e) => handleRepChange(index, e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  {representantes.length > 1 && (
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="mt-2"
                      onClick={() => removeRepresentante(index)}
                    >
                      ❌ Eliminar
                    </Button>
                  )}
                </Card.Body>
              </Card>
            ))}
            <Button variant="outline-primary" onClick={addRepresentante}>
              ➕ Añadir representante
            </Button>
          </Accordion.Body>
        </Accordion.Item>

        {/* Página 3 */}
        <Accordion.Item eventKey="6">
          <Accordion.Header>Actividad y CNAE</Accordion.Header>
          <Accordion.Body>
            <Form.Group className="mb-3">
              <Form.Label>Actividad Principal</Form.Label>
              <Form.Control
                type="text"
                name="actividadPrincipal"
                value={formData.actividadPrincipal}
                onChange={handleChange}
              />
            </Form.Group>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>CNAE</Form.Label>
                  <Form.Control
                    type="text"
                    name="cnae"
                    value={formData.cnae}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Fecha Inicio Actividad</Form.Label>
                  <Form.Control
                    type="date"
                    name="fechaInicioActividad"
                    value={formData.fechaInicioActividad}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group className="mb-3">
                  <Form.Label>Empleados</Form.Label>
                  <Form.Control
                    type="number"
                    name="empleados"
                    value={formData.empleados}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group className="mb-3">
                  <Form.Label>Facturación Anual (€)</Form.Label>
                  <Form.Control
                    type="number"
                    name="facturacionAnual"
                    value={formData.facturacionAnual}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Sector</Form.Label>
              <Form.Control
                type="text"
                name="sector"
                value={formData.sector}
                onChange={handleChange}
              />
            </Form.Group>
          </Accordion.Body>
        </Accordion.Item>

        {/* Página 4 */}
        <Accordion.Item eventKey="7">
          <Accordion.Header>Observaciones</Accordion.Header>
          <Accordion.Body>
            <Form.Group className="mb-3">
              <Form.Label>Observaciones</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="observaciones"
                value={formData.observaciones}
                onChange={handleChange}
              />
            </Form.Group>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <div className="mt-4 text-center">
        <Button variant="success" onClick={handleGuardar}>
          Guardar en BBDD
        </Button>
        <Button
          variant="secondary"
          className="ms-2"
          onClick={handleDescargarPDF}
        >
          Descargar PDF
        </Button>
      </div>
    </Container>
  );
}

export default SociedadForm;
