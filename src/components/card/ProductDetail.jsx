import React from "react";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";
import products from "../data/products";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <h2>Product not found!</h2>;
  }

  return (
    <div className="product-detail">
      <img src={product.picture} alt={product.name} className="product-image" />
      <h2>{product.name}</h2>
      <p>Price: ${product.price}</p>
      <p>Available Colors: {product.colors.join(", ")}</p>
      <button className="buy-btn">Buy Now</button>
    </div>
  );
};

export default ProductDetail;
