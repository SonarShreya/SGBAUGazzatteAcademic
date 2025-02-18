import React, { useState } from 'react';

const SearchComponent = () => {
  const [key, setKey] = useState('');  // Store search term
  const [products, setProducts] = useState([]);  // Store search results
  
  const searchHandle = async () => {
    if (key) {
      try {
        // Fetch results based on the search term
        let result = await fetch(`http://localhost:5001/search/${key}`);
        result = await result.json();
        
        if (result && result.length > 0) {
          setProducts(result);
        } else {
          setProducts([]);  // No results found
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        value={key}
        onChange={(e) => setKey(e.target.value)}  // Update the search term on input change
        placeholder="Enter search term"
      />
      <button onClick={searchHandle}>Search</button> {/* Trigger search on button click */}
      
      {/* Display results */}
      <div>
        {products.length > 0 ? (
          products.map((product, index) => (
            <div key={index}>{product.name}</div>  // Modify based on the structure of the product data
          ))
        ) : (
          <div>No products found</div>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
