import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CartPage from "./components/CartPage";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import CategoryList from "./components/CategoryList";
import CategoryProducts from "./components/CategoryProducts";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/categories/:categoryName" element={<CategoryProducts />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
