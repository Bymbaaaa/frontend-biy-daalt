import React from "react";
import logo from "./logo.png";
import { Link } from "react-router-dom";
import { useCart } from "../cart/cartOperations";
import { useAuth } from "../AuthContext";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <div className="fixed top-0 left-0 w-full h-[70px] text-center bg-[rgb(103,162,129)] text-white flex items-center z-[1000]">
      <img src={logo} alt="" className="h-[50px] absolute left-[100px]" />
      <nav className="absolute right-[60px]">
        <Link to="/"><strong className="mr-[100px] text-lg font-semibold">HOME</strong></Link>
        <Link to="/card"><strong className="mr-[100px] text-lg font-semibold">SHOP</strong></Link>
        <Link to="/contact"><strong className="mr-[100px] text-lg font-semibold">CONTACT</strong></Link>
        <Link to="/cart" className="relative"><strong className="mr-[100px] text-lg font-semibold">CART {totalItems > 0 && <span>({totalItems})</span>}</strong></Link>
        {isAuthenticated && <Link to="/profile"><strong className="mr-[100px] text-lg font-semibold">PROFILE</strong></Link>}
        {isAuthenticated ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </div>
  );
}