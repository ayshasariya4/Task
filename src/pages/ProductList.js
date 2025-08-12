// ProductList.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart, FaShoppingCart, FaEye } from "react-icons/fa";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

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

  const addToCart = (product, e) => {
  e.stopPropagation();

  // Get existing cart items from localStorage or start empty
  const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if product already in cart
  const index = existingCart.findIndex((item) => item.id === product.id);

  if (index >= 0) {
    // If exists, increase quantity
    existingCart[index].quantity += 1;
  } else {
    // Else, add new product with quantity 1
    existingCart.push({ ...product, quantity: 1 });
  }

  // Save updated cart back to localStorage
  localStorage.setItem("cart", JSON.stringify(existingCart));
  alert(`Added "${product.title}" to cart!`);
};

  const viewProduct = (id, e) => {
    e.stopPropagation();
    navigate(`/product/${id}`); // You can add a product detail route later
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
      {/* Category Circles */}
      <div
        style={{
          display: "flex",
          gap: "25px",
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: "40px",
        }}
      >
        {/* {categories.map((category) => (
          <div
            key={category}
            onClick={() => handleCategoryClick(category)}
            style={{
              cursor: "pointer",
              backgroundColor: "#007bff",
              color: "white",
              borderRadius: "50%",
              width: "110px",
              height: "110px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "600",
              fontSize: "1.1rem",
              textAlign: "center",
              padding: "10px",
              boxShadow: "0 4px 10px rgba(0,123,255,0.4)",
              userSelect: "none",
              textTransform: "capitalize",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#0056b3";
              e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,86,179,0.6)";
              e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#007bff";
              e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,123,255,0.4)";
              e.currentTarget.style.transform = "scale(1)";
            }}
            title={`View products in ${category}`}
          >
            <img
              src={
                categoryImages[category] ||
                "https://cdn-icons-png.flaticon.com/512/565/565547.png"
              }
              alt={category}
              style={{
                width: "40px",
                height: "40px",
                marginBottom: "6px",
                filter: "brightness(0) invert(1)",
              }}
            />
            {category}
          </div>
        ))} */}
      </div>

      {/* Featured Products */}
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
                  onClick={(e) => addToCart(product, e)}
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
