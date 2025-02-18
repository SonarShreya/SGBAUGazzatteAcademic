import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom";
const ProductList = () => {
    const[products,setProducts]=useState([]);
    useEffect(()=>{
     getProducts();
    },[])


    const getProducts=async()=>{
    let result =  await fetch("http://localhost:5001/products") 
  result = await result.json();
    setProducts(result);
}

const deleteProduct =async(id)=>{
console.warn(id)
let result = await fetch(`http://localhost:5001/product/${id}`,{
  method:"Delete"
});result= await result.json();
if(result){
  getProducts();
} 
}
const serachHandle = async (event) => {
  let key = event.target.value;
  if (key) {
    let result = await fetch(`http://localhost:5001/search/${key}`);
    result = await result.json();
    if (result.length > 0) {
      setProducts(result);
    } else {
      setProducts([]); // Clear products if no match
    }
  } else {
    getProducts(); // Reset product list if search input is cleared
  }
};

  return (
    <div className='product-list'>
      <h1>Product List </h1>
      <input type ="text" className ="serach-product-box"placeholder='Serach Product'
      onChange={serachHandle}></input>
      <ul>
        <li>Sr.No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Operation</li> 
        {/* <li>Company</li> */}
         </ul>
         {
            products.length> 0 ? products.map(( item,index)=>
            <ul key = {item._id}> 
            <li>{index+1}</li>
            <li>{item .name}</li>
            <li> ${item.price}</li>
            <li>{item.category}</li>
            <li><button onClick ={()=>{deleteProduct(item._id)}}>Delete</button>
            <Link to ={"/update/"+item._id}>Update</Link></li>
            </ul>
            )
            :<h1> Result Not Found</h1>
         }
    </div>
  )
}

export default ProductList





