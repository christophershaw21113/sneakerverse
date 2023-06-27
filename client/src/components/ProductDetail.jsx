import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';

const ProductDetail = (props) => {
    const { order, setOrder } = props
    const { id } = useParams();
    const [classes, setClasses] = useState('')
    // const [sneakerName, setSneakerName] = useState('');
    const [product, setProduct] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8000/api/shoes/${id}`)
            .then((response) => {
                // Store the product information in the component's state
                setProduct(response.data);
            })
            .catch((error) => {
                console.log('Error:', error);
            });
        // eslint-disable-next-line
    }, []);

    const addToCart = () => {
        const existingItem = order.find((item) => item._id === product._id)
        setClasses('hidden')
        if (existingItem) {
            console.log("This item is already in the cart.")
            return
        }
        setOrder([...order, product])
        console.log(order)
    }

    return (
        <div style={{ marginTop: "100px" }}>
            <Link to="/">Home</Link>
            <br />
            <img src={`http://localhost:8000/uploads/${product.image}`} alt={product.name} style={{ width: "100px" }} />
            <h2>Name: {product.name}</h2>
            <h2>Brand: {product.brand}</h2>
            <h2>Gender: {product.gender}</h2>
            <h2>Price: {product.price}</h2>
            <h2>Discounted Price: {product.discountedPrice}</h2>
            <h2>Color: {product.color}</h2>
            <h2>Size: {product.size}</h2>
            <h2>Description: {product.description}</h2>
            <button className={classes} onClick={addToCart}>Add To Cart</button>
        </div>
    )
}

export default ProductDetail;