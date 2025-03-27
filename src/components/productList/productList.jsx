import React, { useState, useEffect } from "react";
import Filter from "../filter/filter";
import Card from "../card/Card";
import { useAuth } from "../AuthContext";

const ProductList = () => {
  const { isAuthenticated } = useAuth();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    colors: "",
    picture: ""
  });

  useEffect(() => {
    fetch("http://localhost:4000/api/products/seeProducts")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

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

  const handleAddProduct = (e) => {
    e.preventDefault();
    const productData = {
      ...newProduct,
      price: parseFloat(newProduct.price),
      colors: newProduct.colors.split(",")
    };

    fetch("http://localhost:4000/api/products/newProduct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData)
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts([...products, data]);
        setFilteredProducts([...filteredProducts, data]);
        setShowForm(false);
      })
      .catch((error) => console.error("Error adding product:", error));
  };

  return (
  <>
  <div className="filterBox">
        <Filter onFilterChange={handleFilterChange} />
      </div>
      {isAuthenticated && (
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Add Product"}
        </button>
      )}
    <div className="productBox">
      {showForm && (
        <form onSubmit={handleAddProduct}>
          <input type="text" placeholder="Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} required />
          <input type="number" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} required />
          <input type="text" placeholder="Colors (comma separated)" value={newProduct.colors} onChange={(e) => setNewProduct({ ...newProduct, colors: e.target.value })} required />
          <input type="text" placeholder="Image URL" value={newProduct.picture} onChange={(e) => setNewProduct({ ...newProduct, picture: e.target.value })} required />
          <button type="submit">Submit</button>
        </form>
      )}
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
  </>
    
  );
};

export default ProductList;
