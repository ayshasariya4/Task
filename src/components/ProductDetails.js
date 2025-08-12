import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) {
    return <p style={{ textAlign: "center" }}>Loading product...</p>;
  }

  return (
    <div style={{ padding: "30px", background: "#f8f9fa", minHeight: "100vh" }}>
      <div
        style={{
          background: "white",
          maxWidth: "900px",
          margin: "auto",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0px 4px 15px rgba(0,0,0,0.08)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "30px",
        }}
      >
        <img
          src={product.image}
          alt={product.title}
          style={{
            maxWidth: "100%",
            height: "400px",
            objectFit: "contain",
            borderRadius: "10px",
          }}
        />
        <div>
          <h2 style={{ marginBottom: "10px" }}>{product.title}</h2>
          <div
            style={{
              color: "#28a745",
              fontWeight: "bold",
              fontSize: "1.5em",
              marginBottom: "15px",
            }}
          >
            ${product.price}
          </div>
          <p style={{ color: "#555", lineHeight: "1.6" }}>
            {product.description}
          </p>
          <button
            onClick={() => navigate(-1)}
            style={{
              marginTop: "20px",
              padding: "10px 15px",
              background: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            ⬅ Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
