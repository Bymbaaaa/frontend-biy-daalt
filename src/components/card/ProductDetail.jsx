import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams(); // Get product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only run if 'id' is defined
    if (!id) return;
  
    const fetchProductDetail = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/products/${id}`);
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProductDetail();
  }, [id]); // Ensure the effect runs only when 'id' changes
  
  // Handle loading, error, and product display
  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

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
