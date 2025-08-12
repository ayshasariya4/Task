import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "30px", background: "#f8f9fa", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>
        Featured Products
      </h1>
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
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              cursor: "pointer",
            }}
            onClick={() => navigate(`/product/${product.id}`)}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow =
                "0px 6px 20px rgba(0,0,0,0.15)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow =
                "0px 4px 15px rgba(0,0,0,0.08)")
            }
          >
            <img
              src={product.image}
              alt={product.title}
              style={{
                height: "200px",
                objectFit: "contain",
                marginBottom: "15px",
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

export default ProductList;
