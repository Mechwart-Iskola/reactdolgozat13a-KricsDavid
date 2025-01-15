
import React, { useState, useEffect } from 'react';
import "./App.css";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
};

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProduct, setFilteredProduct] = useState<Product | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    
    fetch('/products.json')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error loading products:', error));
  }, []);

  const handleSearch = () => {
    const result = products.find((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (result) {
      setFilteredProduct(result);
      setErrorMessage('');
    } else {
      setFilteredProduct(null);
      setErrorMessage('No product found with the given name.');
    }
  };

  return (
    <div className="app">
      <h1>Product Search</h1>
      <div className="search-box">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter product name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="result">
        {filteredProduct ? (
          <div className="product">
            <img
              src={filteredProduct.image}
              alt={filteredProduct.name}
              className="product-image"
            />
            <h2>{filteredProduct.name}</h2>
            <p>Price: ${filteredProduct.price}</p>
            <p>Category: {filteredProduct.category}</p>
          </div>
        ) : (
          errorMessage && <p className="error-message">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default App; 