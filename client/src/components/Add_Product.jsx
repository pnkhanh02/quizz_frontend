import React, { useState } from 'react';
import Avatar from '../assets/avatarUser.png';
import quizService from '../services/quizService';

const AddProduct = () => {
    const [image,setImage] =useState(false);
    const [productDetails, setProductDetails] = useState({
        name:"",
        image:"",
        category: "woment",
        new_price:" ",
        old_price:""
    })
    const imageHandler = (e) =>{
        setImage(e.target.files[0]);
    }
    const changeHandler = (e)=>{
        setProductDetails({...productDetails,[e.target.name]:e.target.value})
    }
    const Add_Product = async ()=>{
        console.log(productDetails);
        let product = productDetails;
        let responseData
        let formData = new FormData();
        formData.append('product',image);

        await fetch('http://localhost:5000/api/v1/upload',{
            method:'POST',
            headers:{
                Accept:'application/json',
            },
            body:formData,
        }).then((resp)=>resp.json()).then((data)=>{responseData = data})
        if (responseData.success) {
                product.image = responseData.image_url;
                console.log(product);
            }
    }
  return (
    <div className='add-product'>
        <div className='addproduct-itemfield'>
            <p>Product title</p>
            <input value={productDetails.name} onChange={changeHandler} type='text' name='name' placeholder='Type here'/>
        </div>
        <div className='addproduct-price'>
            <div className='addproduct-itemfield'>
                <p>Price</p>
                <input value={productDetails.old_price} onChange={changeHandler} type='text' name='old_price' placeholder='Type here'/>
            </div>
            <div className='addproduct-itemfield'>
                <p>Offer Price</p>
                <input value={productDetails.new_price} onChange={changeHandler} type='text' name='new_price' placeholder='Type here'/>
            </div>
        </div>
        <div className='addproduct-itemfield'>
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} name='category' className='add-product-selector'>
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kid</option>
                </select>
            </div>
        <div className='addproduct-itemfield'>
            <label htmlFor='file-input'>
                <img src={image?URL.createObjectURL(image):Avatar} className='addproduct-thumnail-img rounded-full w-24 h-24 mr-0 mb-2' alt=""/>
            </label>
            <input onChange={imageHandler} type='file' name='image' id='file-input'  hidden/>
        </div>
        <button onClick={()=>{Add_Product()}} className='addproduct-btn'>ADD</button>
    </div>
  )
}

export default AddProduct
