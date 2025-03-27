import React, { useState } from "react";
import "./App.css";
import Card from "./components/card/Card";
import Filter from "./components/filter/filter";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/homePage";
import Contact from "./components/contact/Contact";
import CartPage from "./components/cart/cart";
import Profile from "./components/profile/Profile"
import { CartProvider } from "./components/cart/cartOperations";
import { AuthProvider, ProtectedRoute } from "./components/AuthContext"
import Login from "./components/Login";
import products from "./components/data/products";
import ProductDetail from "./components/card/ProductDetail";
import Register from "./components/Register";

const App = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleFilterChange = (filters) => {
    let filtered = products.filter((product) => {
      return (
        (filters.name === "" || product.name.toLowerCase().includes(filters.name.toLowerCase())) &&
        (filters.color === "" || product.colors.includes(filters.color)) &&
        (filters.minPrice === "" || product.price >= parseFloat(filters.minPrice)) &&
        (filters.maxPrice === "" || product.price <= parseFloat(filters.maxPrice))
      );
    });
    setFilteredProducts(filtered);
  };

  return (
    <AuthProvider>
      <CartProvider>
      <Router>
        <Header />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<CartPage />} />
            <Route
              path="/card"
              element={
                <div className="productBox">
                  <div className="filterBox">
                    <Filter onFilterChange={handleFilterChange} />
                  </div>
                  {filteredProducts.map((product) => (
                    <Card
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      colors={product.colors}
                      img={product.picture}
                    />
                  ))}
                </div>
              }
            />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
             <Route path="/profile" element={
                <ProtectedRoute> 
                  <Profile /> 
                </ProtectedRoute>
               } />
          </Routes>
        </main>
        <Footer />
      </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
