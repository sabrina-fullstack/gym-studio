import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <span className="navbar-brand">
        Fitness<span>GYM</span>
      </span>
      <NavLink to="/" className="nav-link">
        Home
      </NavLink>
      <NavLink to="/about" className="nav-link">
        About
      </NavLink>
      <NavLink to="/classes" className="nav-link">
        Classes
      </NavLink>
      <NavLink to="/add" className="nav-link">
        Add class
      </NavLink>
    </nav>
  );
}
