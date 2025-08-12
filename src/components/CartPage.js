import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  // Update cart in localStorage and state
  const updateQuantity = (productId, delta) => {
    setCartItems((prev) => {
      const updated = prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    const updated = cartItems.filter((item) => item.id !== productId);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: "30px", textAlign: "center" }}>
        <h2>Your cart is empty.</h2>
        <button onClick={() => navigate("/")}>Go Shopping</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "auto" }}>
      <h1>Shopping Cart</h1>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
          marginBottom: "40px",
        }}
      >
        <thead>
          <tr style={{ borderBottom: "2px solid #ccc" }}>
            <th style={{ textAlign: "left", padding: "10px" }}>Product</th>
            <th style={{ textAlign: "center", padding: "10px" }}>Price</th>
            <th style={{ textAlign: "center", padding: "10px" }}>Quantity</th>
            <th style={{ textAlign: "center", padding: "10px" }}>Subtotal</th>
            <th style={{ padding: "10px" }}>Remove</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(({ id, title, price, quantity, image }) => (
            <tr key={id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "10px", display: "flex", alignItems: "center" }}>
                <img
                  src={image}
                  alt={title}
                  style={{ height: "50px", marginRight: "15px", objectFit: "contain" }}
                />
                <span>{title.length > 40 ? title.slice(0, 37) + "..." : title}</span>
              </td>
              <td style={{ textAlign: "center" }}>${price.toFixed(2)}</td>
              <td style={{ textAlign: "center" }}>
                <button
                  onClick={() => updateQuantity(id, -1)}
                  style={{ marginRight: "10px" }}
                >
                  -
                </button>
                {quantity}
                <button
                  onClick={() => updateQuantity(id, +1)}
                  style={{ marginLeft: "10px" }}
                >
                  +
                </button>
              </td>
              <td style={{ textAlign: "center" }}>
                ${(price * quantity).toFixed(2)}
              </td>
              <td style={{ textAlign: "center" }}>
                <button onClick={() => removeFromCart(id)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 style={{ textAlign: "right" }}>Total: ${totalPrice.toFixed(2)}</h2>
      <div style={{ textAlign: "right", marginTop: "20px" }}>
        <button
          onClick={() => alert("Proceed to checkout (not implemented)")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartPage;
