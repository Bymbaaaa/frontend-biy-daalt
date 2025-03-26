import React from "react";
import "./Header.css";
import logo from "./logo.png"
import { Link } from "react-router-dom";
import { useCart } from "../cart/cartOperations";

export default function Header() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  return (
     <div className="header">
            <img src={logo} alt="" className="logo"/>
            <nav className="navbar">
              <Link to="/"> <strong>HOME</strong></Link>
              <Link to="/card"><strong>SHOP</strong></Link>
              <Link to="/contact"><strong>CONTACT</strong></Link>
              <Link to="/cart" style={{ position: "relative", marginLeft: "20px" }}>
                        🛒 Cart {totalItems > 0 && <span>({totalItems})</span>}
              </Link>
            </nav>
        </div>
  );
}