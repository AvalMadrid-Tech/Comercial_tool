import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AltaIdentidades from './views/AltaIdentidades';
import SolicitudAutonomos from "./views/SolicitudAutonomos";
import SolicitudSociedades from './views/SolicitudSociedades';
import Home from "./views/Home"
import Login from "./views/Login";
import Register from "./views/Register";
import Navbar from "./components/Navbar";


import './App.css';

function App() {
  return (
    <Router>
      <Navbar />

      <div className="App">
        <h1>Comercial AvalMadrid</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/alta" element={<AltaIdentidades/>} />  
          <Route path="/autonomos" element={<SolicitudAutonomos />} />
          <Route path="/sociedad" element={<SolicitudSociedades />} />

          {/* si más vistas tienen página de resultados, añádelas aquí */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
