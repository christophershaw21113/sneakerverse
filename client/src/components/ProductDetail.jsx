import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from 'axios';

const ProductDetail = (_props) =>{

    const {sneakerName} = useParams();


    const [product, setProduct] = useState({});

    useEffect(() =>{
        axios.get(`http://localhost:8000/api/product?sneakerName=${sneakerName}`)
        .then((response) => {
            // Store the product information in the component's state
            setProduct(response.data);
        })
        .catch((error) => {
            console.log('Error:', error);
        });
    }, [sneakerName]); 


    return (
        <div className="">
            <Link to="/">Home</Link> 

            <h2>Name: {product.name}</h2>
            <h2>Brand: {product.brand}</h2>
            <h2>Gender: {product.gender}</h2>
            <h2>Price: {product.price}</h2>
            <h2>Discounted Price: {product.discountedPrice}</h2>
            <h2>Image: {product.image}</h2>
            <h2>Color: {product.color}</h2>
            <h2>Size: {product.size}</h2>
            <h2>Description: {product.description}</h2>

            



        </div>
    )
}

export default ProductDetail;