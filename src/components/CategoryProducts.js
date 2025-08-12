import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function CategoryProducts() {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/category/${categoryName}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched products:", data); // Debug log
        setProducts(data);
      })
      .catch((err) => console.error("Error fetching category products:", err));
  }, [categoryName]);

  return (
    <div style={{ padding: "30px", background: "#f8f9fa", minHeight: "100vh" }}>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          color: "#333",
          textTransform: "capitalize",
        }}
      >
        {categoryName}
      </h1>

      <button
        onClick={() => navigate(-1)}
        style={{
          display: "block",
          margin: "0 auto 30px auto",
          background: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          padding: "10px 15px",
          cursor: "pointer",
        }}
      >
        ⬅ Back to Categories
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "25px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              background: "white",
              borderRadius: "12px",
              boxShadow: "0px 4px 15px rgba(0,0,0,0.08)",
              padding: "20px",
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <img
              src={product.image || 'https://via.placeholder.com/250x200?text=No+Image'}
              alt={product.title}
              style={{
                width: "100%",
                maxWidth: "250px",
                height: "200px",
                objectFit: "contain",
                marginBottom: "15px",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
            <div
              style={{
                fontWeight: "bold",
                fontSize: "1em",
                color: "#333",
                marginBottom: "8px",
              }}
            >
              {product.title}
            </div>
            <div style={{ color: "#28a745", fontWeight: "bold" }}>
              ${product.price}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryProducts;
