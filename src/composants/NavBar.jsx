import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("isAdmin");

  const logout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">MonSite</h2>

      <div className="links">
        <Link to="/evenement">Evenement</Link>

        {!isAdmin && <Link to="/login">Login</Link>}

        {isAdmin && (
          <>
            <Link to="/admin">Admin</Link>
            <Link to="/dashboard">Dashboard</Link>
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

