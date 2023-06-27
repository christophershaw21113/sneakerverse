import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';

const ProductDetail = (props) => {
    const { order, setOrder } = props
    const { id } = useParams();
    const [hidden, setHidden] = useState(false)
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
        setHidden(!hidden)
        if (existingItem) {
            console.log("This item is already in the cart.")
            return
        }
        setOrder([...order, product])
        console.log(order)
    }

    return (
        <div style={{ marginTop: "100px", width:"50%" }}>

            <Link to="/">Home</Link>
            <br />
            <img src={`http://localhost:8000/uploads/${product.image}`} alt={product.name} style={{ width: "100px" }} />
            <h2>Shoe: {product.brand} {product.name}</h2>

            <h3>Price: <span style={{ color: 'red', textDecoration: 'line-through' }}>${product.price}</span> ${product.discountedPrice}</h3>
            <h5>Color: {product.color}</h5>
            <h5>Size: {product.size} {product.gender}</h5>
            <p>Description: {product.description}</p>
            <br />
            <button className={hidden ? "hidden" : null} onClick={addToCart}>Add To Cart</button>
            <p className={!hidden ? "hidden" : null}>You've added this shoe to your cart!</p>
        </div>
    )
}

export default ProductDetail;