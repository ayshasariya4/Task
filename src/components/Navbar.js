import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaListUl, FaShoppingCart, FaStore, FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle menu visibility on small screens
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Common link styles
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
  };

  return (
    <nav
      style={{
        background: "#1a1a1a",
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

      {/* Hamburger Icon for small screens */}
      <div
        onClick={toggleMenu}
        style={{
          display: "none",
          fontSize: "1.5rem",
          cursor: "pointer",
        }}
        className="hamburger"
        aria-label="Toggle menu"
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Navigation Links */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",

          // Responsive styles (will be overridden by CSS below)
        }}
        className={`nav-links ${menuOpen ? "open" : ""}`}
      >
        <Link
          to="/"
          style={linkStyle}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#FFD700")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
          onClick={() => setMenuOpen(false)}
        >
          <FaHome /> Home
        </Link>

        <Link
          to="/categories"
          style={linkStyle}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#FFD700")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
          onClick={() => setMenuOpen(false)}
        >
          <FaListUl /> Categories
        </Link>

        <a
          href="#cart"
          style={linkStyle}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#FFD700")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
          onClick={() => setMenuOpen(false)}
        >
          <FaShoppingCart /> Cart
        </a>
      </div>

      {/* Inline CSS for responsive hamburger menu */}
      <style>{`
        @media (max-width: 768px) {
          nav {
            padding: 10px 15px;
          }
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
            max-height: 300px; /* Enough to show all links */
          }
          .nav-links a, .nav-links .router-link-active {
            padding: 10px 0;
            border-top: 1px solid rgba(255,255,255,0.2);
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
