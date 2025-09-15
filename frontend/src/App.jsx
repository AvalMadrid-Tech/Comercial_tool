import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import SolicitudAutonomos from "./views/SolicitudAutonomos";
import SolicitudSociedades from './views/SolicitudSociedades';


import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Comercial AvalMadrid</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/autonomos" element={<SolicitudAutonomos />} />
          <Route path="/sociedad" element={<SolicitudSociedades />} />

          {/* si más vistas tienen página de resultados, añádelas aquí */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
