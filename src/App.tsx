
import React, { useState, useEffect } from 'react';
import "./App.css";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
};

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProduct, setFilteredProduct] = useState<Product | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    
    fetch('/products.json')
      .then((response) => response.json())
      .then((data) => {
        console.log('Loaded data:', data); 
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch((error) => console.error('Error loading products:', error));
  }, []);

  const handleSearch = () => {
    if (!Array.isArray(products)) {
      setErrorMessage('Invalid product data.');
      return;
    }

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
    <div className="product-card">
      <h1>Product Search</h1>
      <div className="search-section">
        <label htmlFor="search">Search Product:</label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter product name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="results-section">
        {filteredProduct ? (
          <div className="product-info">
            <img
              src={filteredProduct.image}
              alt={filteredProduct.name}
              className="product-image"
            />
            <div className="product-details">
              <p><strong>Name:</strong> {filteredProduct.name}</p>
              <p><strong>Price:</strong> ${filteredProduct.price}</p>
              <p><strong>Category:</strong> {filteredProduct.category}</p>
            </div>
          </div>
        ) : (
          errorMessage && <p className="error">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default App; 