// const products = [
//     {
//       id: 1,
//       name: "product 1",
//       price: 19.99,
//       colors: ["red", "blue", "green"],
//       picture: 'https://www.davidgandywellwear.com/cdn/shop/products/Ultimate-Loopback-Hoodie-Black.jpg?v=1677258480&width=600'
//     },
//     {
//       id: 2,
//       name: "product 2",
//       price: 24.99,
//       colors: ["yellow", "purple", "white"],
//       picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROieLOil25UZD046CyJrVLcTtr1CglTjH74Q&s'
//     },
//     {
//       id: 3,
//       name: "product 3",
//       price: 29.99,
//       colors: ["black", "pink", "orange"],
//       picture: 'https://example.com/product1.jpg'
//     },
//     {
//       id: 4,
//       name: "product 4",
//       price: 15.99,
//       colors: ["brown", "grey", "teal"],
//       picture: 'https://example.com/product1.jpg'
//     },
//     {
//       id: 5,
//       name: "product 5",
//       price: 39.99,
//       colors: ["cyan", "lime", "magenta", "indigo"],
//       picture: 'https://example.com/product1.jpg'
//     },
//     {
//       id: 6,
//       name: "product6",
//       price: 4.99,
//       colors: ["cyan", "lime", "magenta", "indigo"],
//       picture: 'https://example.com/product1.jpg'
//     }
//   ];

import React, { useState } from "react";

const Products = ({ onProductAdded }) => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    colors: "",
    picture: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/products/newProducts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...product,
          colors: product.colors.split(","), 
        }),
      });
      if (response.ok) {
        const newProduct = await response.json();
        onProductAdded(newProduct); 
        setProduct({ name: "", price: "", colors: "", picture: "" });
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Product Name" value={product.name} onChange={handleChange} required />
      <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} required />
      <input type="text" name="colors" placeholder="Colors (comma-separated)" value={product.colors} onChange={handleChange} required />
      <input type="text" name="picture" placeholder="Image URL" value={product.picture} onChange={handleChange} required />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default Products

