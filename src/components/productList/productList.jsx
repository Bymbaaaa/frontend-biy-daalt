import React, { useState, useEffect } from "react";
import Filter from "../filter/filter";
import Card from "../card/Card";
import { useAuth } from "../AuthContext";

const ProductList = () => {
  const { isAuthenticated } = useAuth();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [cart, setCart] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    colors: "",
    picture: "",
  });

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

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
      colors: newProduct.colors.split(","),
    };

    fetch("http://localhost:4000/api/products/newProduct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts([...products, data]);
        setFilteredProducts([...filteredProducts, data]);
        setShowForm(false);
      })
      .catch((error) => console.error("Error adding product:", error));
  };

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
  };

  return (
    <>
      <div className="filterBox">
        <Filter onFilterChange={handleFilterChange} />
      </div>

      {isAuthenticated && (
        <button
          className="bg-blue-500 text-white py-2 px-4 border-0 rounded cursor-pointer transition-colors duration-300 ease-in-out hover:bg-blue-700 focus:outline-none"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "Add Product"}
        </button>
      )}

      <div className="flex flex-wrap gap-4 justify-between p-5">
        {showForm && (
          <form
            className="bg-gray-100 p-5 rounded-lg shadow-md w-full max-w-[500px] mx-auto my-5 transition duration-300 ease-in-out"
            onSubmit={handleAddProduct}
          >
            <input
              className="w-full p-2.5 my-2.5 border border-gray-300 rounded text-base"
              type="text"
              placeholder="Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              required
            />
            <input
              className="w-full p-2.5 my-2.5 border border-gray-300 rounded text-base"
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              required
            />
            <input
              className="w-full p-2.5 my-2.5 border border-gray-300 rounded text-base"
              type="text"
              placeholder="Colors (comma separated)"
              value={newProduct.colors}
              onChange={(e) => setNewProduct({ ...newProduct, colors: e.target.value })}
              required
            />
            <input
              className="w-full p-2.5 my-2.5 border border-gray-300 rounded text-base"
              type="text"
              placeholder="Image URL"
              value={newProduct.picture}
              onChange={(e) => setNewProduct({ ...newProduct, picture: e.target.value })}
              required
            />
            <button
              type="submit"
              className="bg-green-500 border-0 py-2 px-4 rounded text-white cursor-pointer text-base transition-colors duration-300 ease-in-out hover:bg-green-600 focus:outline-none"
            >
              Submit
            </button>
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
            addToCart={() => addToCart(product)}
          />
        ))}
      </div>
    </>
  );
};

export default ProductList;