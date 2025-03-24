import React, {useState} from "react";
import "./App.css";
import Card from "./components/card/Card";
import Filter from "./components/filter/filter";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

const App = () => {
  const products = [
    {
      id: 1,
      name: "product 1",
      price: 19.99,
      colors: ["red", "blue", "green"],
      picture: 'https://www.davidgandywellwear.com/cdn/shop/products/Ultimate-Loopback-Hoodie-Black.jpg?v=1677258480&width=600'
    },
    {
      id: 2,
      name: "product 2",
      price: 24.99,
      colors: ["yellow", "purple", "white"],
      picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROieLOil25UZD046CyJrVLcTtr1CglTjH74Q&s'
    },
    {
      id: 3,
      name: "product 3",
      price: 29.99,
      colors: ["black", "pink", "orange"],
      picture: 'https://example.com/product1.jpg'
    },
    {
      id: 4,
      name: "product 4",
      price: 15.99,
      colors: ["brown", "grey", "teal"],
      picture: 'https://example.com/product1.jpg'
    },
    {
      id: 5,
      name: "product 5",
      price: 39.99,
      colors: ["cyan", "lime", "magenta", "indigo"],
      picture: 'https://example.com/product1.jpg'
    },
  ];

  const [filteredProducts, setFilteredProducts] = useState(products);

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

  return (
    <>
    <Header/>
    <div className="container">
      <div className="filterBox">
         <Filter onFilterChange={handleFilterChange} />
      </div>
    <div className="productBox">
      {filteredProducts.map((product) => (
        <Card key={product.id} name={product.name} price={product.price} colors={product.colors} img={product.picture} />
      ))}
    </div>
    </div>
    <Footer/>
    </>
  );
}

export default App;