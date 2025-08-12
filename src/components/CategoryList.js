import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "30px", background: "#f8f9fa", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>
        Product Categories
      </h1>

      <ul
        style={{
          maxWidth: "600px",
          margin: "auto",
          listStyle: "none",
          padding: 0,
        }}
      >
        {categories.map((cat) => (
          <li
            key={cat}
            onClick={() => navigate(`/categories/${cat}`)}
            style={{
              background: "white",
              margin: "10px 0",
              padding: "15px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              textTransform: "capitalize",
              fontWeight: "600",
              fontSize: "1.1rem",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#007BFF")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
          >
            {cat}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryList;
