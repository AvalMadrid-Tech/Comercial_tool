import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../services/authService";

function Navbar() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", background: "#f5f5f5" }}>

      {user ? (
        <button onClick={handleLogout} style={{ padding: "5px 10px" }}>
          Salir
        </button>
      ) : (
        <Link to="/login" style={{ padding: "5px 10px" }}>
          Inicio
        </Link>
      )}
    </nav>
  );
}

export default Navbar;
