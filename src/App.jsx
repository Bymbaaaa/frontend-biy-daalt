import React from "react";
import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/homePage";
import Contact from "./components/contact/Contact";
import CartPage from "./components/cart/cart";
import Profile from "./components/profile/Profile";
import { CartProvider } from "./components/cart/cartOperations";
import { AuthProvider, ProtectedRoute } from "./components/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductDetail from "./components/card/ProductDetail";
import ProductList from "./components/productList/productList";

const App = () => {
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
              <Route path="/card" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
