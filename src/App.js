import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CartPage from "./pages/CartPage";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
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
