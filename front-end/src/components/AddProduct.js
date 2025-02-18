import React, { useState } from 'react';

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error,setError]= React.useState(false);
  const addProduct = async () => {
    console.log(name, price, category, company);


if ( !name || !price || !category || !company)
   {
     setError(true)
     console.log("all fields")
    return  false;
  }
    

    try {
      let result = await fetch("http://localhost:5001/add-product", {
        method: "POST", // Use POST in uppercase
        body: JSON.stringify({name, price, category, company  }),
        headers: {
          "Content-Type": "application/json",
        },
      });

        // Check if the response is OK (status code 200-299)
    if (!result.ok) {
      throw new Error(`HTTP error! status: ${result.status}`);
    }
      result = await result.json();
      console.log("Raw response:",result);

      if (result.success) {
        alert("Product added successfully!");
        // Optionally, reset form fields after successful submission
        setName("");
        setPrice("");
        setCategory("");
        setCompany("");
      } else {
        alert("Failed to add product. Please try again.");
      }
    } catch (error) {
      console.error("Error while adding product:", error.message);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className='product'>
      <h1>Add Product</h1>
      <input type="text" placeholder='Enter Product Name' className='inputBox'value={name}onChange={(e) => setName(e.target.value)}/>
      {error && !name && <sapan className="invalid-input">Enter Valid name</sapan>}
      <input type="text" placeholder='Enter Product Price' className='inputBox' value={price} onChange={(e) => setPrice(e.target.value)}/>
     {error && !price && <sapan className="invalid-input">Enter Valid price</sapan>}
      <input type="text" placeholder='Enter Product Category'className='inputBox'value={category}onChange={(e) => setCategory(e.target.value)}/>
     {error && !category && <sapan className="invalid-input">Enter Valid category</sapan>}
      <input type="text" placeholder='Enter Product Company' className='inputBox' value={company} onChange={(e) => setCompany(e.target.value)}/>
    {error && !company  && <sapan className="invalid-input">Enter Valid company </sapan>}
      <button className='addButton' onClick={addProduct}>
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;



































