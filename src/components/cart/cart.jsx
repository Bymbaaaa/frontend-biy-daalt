import React from "react";
import { useCart } from "./cartOperations";
import "./cart.css"

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();

  return (
      <div className="cart-page">
          <h2 className="cart-title">CART ITEMS</h2>
          
          <div className="cart-items">
              {cart.length === 0 ? (
                  <p className="empty-cart">Your cart is empty.</p>
              ) : (
                  cart.map((item, index) => (
                      <div key={item.id} className="cart-item">
                          <span className="cart-index">{index + 1}</span>
                          <img src={item.img} alt={item.name} className="cart-image" />
                          <div className="cart-details">
                              <h4>{item.name}</h4>
                              <p>${item.price}</p>
                          </div>
                          
                          <div className="quantity-control">
                              <button className="quantity-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                              <span className="quantity">{item.quantity}</span>
                              <button className="quantity-btn" onClick={() => updateQuantity(item.id, -1)}>-</button>
                          </div>

                          <button className="remove" onClick={() => removeFromCart(item.id)}>Remove</button>
                      </div>
                  ))
              )}
          </div>

          
          <div className="order-summary">
              <h3>ORDER SUMMARY</h3>
              <p>Total: <span> ${cart.reduce((total, item) => total + item.price * item.quantity, 0)}</span></p>
              <button className="payment-btn">PAYMENT</button>
          </div>
      </div>
  );
};


export default CartPage;
