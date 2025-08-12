import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaListUl, FaShoppingCart, FaStore } from "react-icons/fa";

function Navbar() {
  return (
    <nav
      style={{
        background: "#1a1a1a",
        color: "white",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
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
        }}
      >
        <FaStore size={24} />
        <h2 style={{ margin: 0, fontWeight: "bold" }}>FakeStore</h2>
      </Link>

      {/* Navigation Links */}
      <div style={{ display: "flex", gap: "20px" }}>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "white",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            transition: "color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.color = "#FFD700")}
          onMouseLeave={(e) => (e.target.style.color = "white")}
        >
          <FaHome /> Home
        </Link>

        <a
          href="/categories"
          style={{
            textDecoration: "none",
            color: "white",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            transition: "color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.color = "#FFD700")}
          onMouseLeave={(e) => (e.target.style.color = "white")}
        >
          <FaListUl /> Categories
        </a>

        <a
          href="#cart"
          style={{
            textDecoration: "none",
            color: "white",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            transition: "color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.color = "#FFD700")}
          onMouseLeave={(e) => (e.target.style.color = "white")}
        >
          <FaShoppingCart /> Cart
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
