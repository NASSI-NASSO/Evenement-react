import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./NavBar.css";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const cart = useSelector(state => state.cart);
  const isAdmin = localStorage.getItem("isAdmin");

  const logout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/");
  };
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="navbar">
      <h2 className="logo"> events</h2>
      
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="links">
        <Link to="/evenement">Evenement</Link>
        <button onClick={() => setIsOpen(true)}>
        Ouvrir le panier({totalItems})
      </button>

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

