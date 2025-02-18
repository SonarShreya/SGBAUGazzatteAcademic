import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, [params]);

  const getProductDetails = async () => {
    let result = await fetch(`http://localhost:5001/product/${params.id}`);
    result = await result.json();
    setPrice(result.price);
    setName(result.name);
    setCategory(result.category);
    setCompany(result.company);
  };

  const updateProduct = async () => {
    let result = await fetch(`http://localhost:5001/product/${params.id}`, {
      method: "PUT",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    navigate("/");
  };

  return (
    <div className="product">
      <h1>Update Product</h1>
      <input
        type="text"
        placeholder="Enter Product Name"
        className="inputBox"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter Product Price"
        className="inputBox"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter Product Category"
        className="inputBox"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter Product Company"
        className="inputBox"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <button className="addButton" onClick={updateProduct}>
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
