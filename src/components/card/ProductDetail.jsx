import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ColorList from "./ColorList";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
  }, [id]);

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
    <div className="flex flex-col items-center max-w-[600px] my-10 mx-auto p-5 rounded-xl bg-white shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
      <div className="flex justify-center mb-5">
        <img
          src={product.picture}
          alt={product.name}
          className="rounded-lg shadow-[0_4px_8px_rgba(0,0,0,0.1)]"
        />
      </div>
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-[10px] text-[#333]">
          {product.name}
        </h1>
        <p className="text-lg text-[#555] mb-[15px]">
          Price: ${product.price}
        </p>
        <ColorList colors={product.colors} />
        <button className="bg-[#ff6b6b] text-white py-3 px-6 text-lg font-bold border-0 rounded-lg cursor-pointer mt-[10px] hover:bg-[#ff4f4f]">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;