import React, { useState } from "react";

const Filter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    name: "",
    color: "",
    minPrice: "",
    maxPrice: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="filter">
      <h2>Filter Products</h2>
      <input
        type="text"
        name="name"
        placeholder="Search by name"
        value={filters.name}
        onChange={handleChange}
      />
      <select name="color" value={filters.color} onChange={handleChange}>
        <option value="">Select Color</option>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
        <option value="yellow">Yellow</option>
        <option value="purple">Purple</option>
        <option value="black">Black</option>
        <option value="pink">Pink</option>
      </select>
      <input
        type="number"
        name="minPrice"
        placeholder="Min Price"
        value={filters.minPrice}
        onChange={handleChange}
      />
      <input
        type="number"
        name="maxPrice"
        placeholder="Max Price"
        value={filters.maxPrice}
        onChange={handleChange}
      />
    </div>
  );
};

export default Filter;
