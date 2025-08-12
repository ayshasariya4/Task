import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart, FaShoppingCart, FaEye } from "react-icons/fa";
import { CartContext } from "../context/CartContext";  // Adjust path as per your structure

function ProductList() {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // Access addToCart from CartContext
  const { addToCart } = useContext(CartContext);

  // Fetch products
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  // Fetch categories
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  const toggleWishlist = (productId, e) => {
    e.stopPropagation();
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Use addToCart from context and show alert
  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    addToCart(product);
    alert(`Added "${product.title}" to cart!`);
  };

  const viewProduct = (id, e) => {
    e.stopPropagation();
    navigate(`/product/${id}`);
  };

  const handleCategoryClick = (category) => {
    navigate(`/category/${encodeURIComponent(category)}`);
  };

  const categoryImages = {
    electronics:
      "https://cdn-icons-png.flaticon.com/512/2748/2748558.png",
    jewelery:
      "https://cdn-icons-png.flaticon.com/512/3064/3064197.png",
    "men's clothing":
      "https://cdn-icons-png.flaticon.com/512/1946/1946488.png",
    "women's clothing":
      "https://cdn-icons-png.flaticon.com/512/888/888857.png",
  };

  return (
    <div style={{ padding: "30px", background: "#f8f9fa", minHeight: "100vh" }}>
      {/* Category Circles (optional, commented in your original) */}
      {/* ... */}

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
        {products.map((product) => {
          const isWishlisted = wishlist.includes(product.id);
          return (
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
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
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
              {/* Wishlist Icon */}
              <div
                onClick={(e) => toggleWishlist(product.id, e)}
                style={{
                  position: "absolute",
                  top: 15,
                  right: 15,
                  color: isWishlisted ? "#e0245e" : "#999",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  transition: "color 0.3s ease",
                  userSelect: "none",
                }}
                title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = isWishlisted
                    ? "#c81e53"
                    : "#ff416c")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = isWishlisted ? "#e0245e" : "#999")
                }
              >
                {isWishlisted ? <FaHeart /> : <FaRegHeart />}
              </div>

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
                  minHeight: "48px",
                }}
                title={product.title}
              >
                {product.title.length > 50
                  ? product.title.slice(0, 47) + "..."
                  : product.title}
              </div>
              <div
                style={{
                  color: "#28a745",
                  fontWeight: "bold",
                  marginBottom: "15px",
                  fontSize: "1.1rem",
                }}
              >
                ${product.price.toFixed(2)}
              </div>

              {/* Icon Buttons Container */}
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                }}
              >
                {/* View Product Icon */}
                <div
                  onClick={(e) => viewProduct(product.id, e)}
                  title="View Product"
                  style={{
                    cursor: "pointer",
                    backgroundColor: "#e0f7fa",
                    color: "#007c91",
                    borderRadius: "50%",
                    padding: "12px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s ease",
                    userSelect: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#00acc1";
                    e.currentTarget.style.color = "white";
                    e.currentTarget.style.transform = "scale(1.2)";
                    e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,172,193,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#e0f7fa";
                    e.currentTarget.style.color = "#007c91";
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
                  }}
                >
                  <FaEye />
                </div>

                {/* Add to Cart Icon */}
                <div
                  onClick={(e) => handleAddToCart(product, e)}
                  title="Add to Cart"
                  style={{
                    cursor: "pointer",
                    backgroundColor: "#bbdefb",
                    color: "#0d47a1",
                    borderRadius: "50%",
                    padding: "12px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s ease",
                    userSelect: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#1976d2";
                    e.currentTarget.style.color = "white";
                    e.currentTarget.style.transform = "scale(1.2)";
                    e.currentTarget.style.boxShadow = "0 6px 12px rgba(25,118,210,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#bbdefb";
                    e.currentTarget.style.color = "#0d47a1";
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
                  }}
                >
                  <FaShoppingCart />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductList;
