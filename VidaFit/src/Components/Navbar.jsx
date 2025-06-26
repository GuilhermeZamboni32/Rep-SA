import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="container-navbar">
      <div className="logo">
        <Link className="espaco-logo" to="/"><img className="logovf" src="LogoVF.png" alt="" /></Link>
        <span className="logo-texto">VidaFit</span>
      </div>

      <div className="nav-links">
        <Link className="texto" to="/home">Seleção de Profissionais</Link>
        <Link className="texto" to="/Avaliacao">Avaliação</Link>
        <Link className="texto" to="/perfil">Perfil</Link>
      </div>
    </div>
  );
}

export default Navbar;
