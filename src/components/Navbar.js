import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaShoppingCart, FaStore, FaBars, FaTimes } from "react-icons/fa";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useContext(CartContext);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const linkStyle = {
    textDecoration: "none",
    color: "white",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "10px 15px",
    cursor: "pointer",
    transition: "color 0.3s ease",
    position: "relative",
  };

  return (
    <nav
      style={{
        background: "#007bff",
        color: "white",
        padding: "10px 20px",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "white",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "1.25rem",
          fontWeight: "bold",
        }}
        onClick={() => setMenuOpen(false)}
      >
        <FaStore size={24} />
        FakeStore
      </Link>

      {/* Hamburger menu */}
      <div
        onClick={toggleMenu}
        style={{ display: "none", fontSize: "1.5rem", cursor: "pointer" }}
        className="hamburger"
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Links */}
      <div
        className={`nav-links ${menuOpen ? "open" : ""}`}
        style={{ display: "flex", gap: "20px", alignItems: "center" }}
      >
        <Link to="/" style={linkStyle} onClick={() => setMenuOpen(false)}>
          <FaHome /> Home
        </Link>

        {/* Cart with badge */}
        <Link to="/cart" style={linkStyle} onClick={() => setMenuOpen(false)}>
          <FaShoppingCart />
          Cart
          {cartCount > 0 && (
            <span
              className="cart-badge"
              style={{
                position: "absolute",
                top: "3px",
                right: "2px",
                background: "red",
                color: "white",
                borderRadius: "50%",
                fontSize: "0.7rem",
                fontWeight: "bold",
                padding: "2px 6px",
                lineHeight: 1,
              }}
            >
              {cartCount}
            </span>
          )}
        </Link>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .hamburger {
            display: block !important;
          }
          .nav-links {
            width: 100%;
            flex-direction: column;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
          }
          .nav-links.open {
            max-height: 300px;
          }
          .nav-links a {
            padding: 10px 0;
            border-top: 1px solid rgba(255,255,255,0.2);
            width: 100%;
            justify-content: center;
          }

          /* Move cart badge above cart icon on mobile */
          .cart-badge {
            top: -12px !important;
            right: 50% !important;
            transform: translateX(50%);
          }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
