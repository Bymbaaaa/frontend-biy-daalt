import React from "react";
import "./Header.css";
import logo from "./logo.png"

export default function Header() {
  return (
    <div className="header">
        <img src={logo} alt="" className="logo"/>
        <nav className="navbar">
          <strong>HOME</strong>
          <strong>SHOP</strong>
          <strong>ABOUT US</strong>
          <strong>CONTACT</strong>
        </nav>
    </div>
  );
}