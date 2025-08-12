import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage if exists, else empty array
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error(err));
  }, [id]);

  // Save cart to localStorage on update
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = () => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex((item) => item.id === product.id);
      if (itemIndex !== -1) {
        // If product already in cart, increase quantity
        const newCart = [...prevCart];
        newCart[itemIndex].quantity += 1;
        return newCart;
      } else {
        // Else add new product with quantity 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    alert(`Added "${product.title}" to cart!`);
  };

  if (!product) {
    return <p style={{ textAlign: "center", marginTop: 50 }}>Loading product...</p>;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fa",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          gap: "40px",
          alignItems: "center",
          padding: "0 10px",
        }}
      >
        {/* Image */}
        <img
          src={product.image}
          alt={product.title}
          style={{
            maxWidth: "100%",
            maxHeight: "400px",
            objectFit: "contain",
            flex: "1 1 0",
            userSelect: "none",
          }}
        />

        {/* Details */}
        <div
          style={{
            flex: "1 1 0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              marginBottom: "15px",
              color: "#222",
              lineHeight: 1.2,
            }}
          >
            {product.title}
          </h1>

          <p
            style={{
              color: "#6b7280",
              fontSize: "1rem",
              marginBottom: "25px",
              lineHeight: "1.6",
              minHeight: "90px",
            }}
          >
            {product.description}
          </p>

          <div
            style={{
              fontWeight: "700",
              fontSize: "1.8rem",
              color: "#10b981",
              marginBottom: "35px",
              letterSpacing: "0.03em",
            }}
          >
            ${product.price.toFixed(2)}
          </div>

          <button
            onClick={handleAddToCart}
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              padding: "15px 30px",
              borderRadius: "10px",
              border: "none",
              fontWeight: "600",
              fontSize: "1.1rem",
              cursor: "pointer",
              boxShadow: "0 6px 15px rgba(37, 99, 235, 0.4)",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              transition: "background-color 0.3s ease, box-shadow 0.3s ease",
              userSelect: "none",
              maxWidth: "220px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#1d4ed8";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(29, 78, 216, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#2563eb";
              e.currentTarget.style.boxShadow = "0 6px 15px rgba(37, 99, 235, 0.4)";
            }}
          >
            <FaShoppingCart size={20} />
            Add to Cart
          </button>

          <button
            onClick={() => navigate(-1)}
            style={{
              marginTop: "25px",
              background: "transparent",
              border: "2px solid #2563eb",
              borderRadius: "10px",
              padding: "12px 25px",
              fontWeight: "600",
              fontSize: "1rem",
              color: "#2563eb",
              cursor: "pointer",
              transition: "all 0.3s ease",
              userSelect: "none",
              maxWidth: "220px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#2563eb";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#2563eb";
            }}
          >
            ← Back to Products
          </button>
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          div[style*="flex-direction: row"] {
            flex-direction: column !important;
          }
          div[style*="gap: 40px"] {
            gap: 20px !important;
          }
          img {
            max-height: 300px !important;
            margin-bottom: 20px;
          }
          button {
            max-width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}

export default ProductDetails;
