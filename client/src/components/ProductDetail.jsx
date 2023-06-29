import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';

const ProductDetail = (props) => {
    const { order, setOrder } = props
    const { id } = useParams();
    const [hidden, setHidden] = useState(false)
    // const [sneakerName, setSneakerName] = useState('');
    const [shoe, setShoe] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8000/api/shoes/${id}`)
            .then((response) => {
                // Store the product information in the component's state
                setShoe(response.data);
            })
            .catch((error) => {
                console.log('Error:', error);
            });
        // eslint-disable-next-line
    }, []);

    const addToCart = () => {
        const existingItem = order.find((item) => item._id === shoe._id)
        setHidden(!hidden)
        if (existingItem) {
            console.log("This item is already in the cart.")
            return
        }
        setOrder([...order, shoe])
        console.log(order)
    }

const isSmallScreen = useMediaQuery({ maxWidth: '965px' });
const pageContainer = {
  marginTop: isSmallScreen ? '40%' : '15%',
  width: '70%',
};

    return (
        <div style={pageContainer}>
          <h1 style={{textAlign: 'center', marginBottom: '40px'}}>Product Detail</h1>
        <div style={{  display: 'flex', marginTop: '20px'}}>
     
            <div>
            <img src={`http://localhost:8000/uploads/${shoe.image}`} alt={shoe.name} style={{ width: "300px" }} />
            </div>
            <div>
            <h2>{shoe.brand} {shoe.name}</h2>
            <h3>Price: <span style={{ textDecoration: 'line-through' }}>${shoe.price}</span><span style={{color: 'red'}}> ${shoe.discountedPrice}</span></h3>
            <h5>Color: {shoe.color}</h5>
            <h5>Size: {shoe.size} {shoe.gender}</h5>
            <p>Description: {shoe.description}</p>
            <br />
            <button id='add-cart-btn' className={hidden ? "hidden" : null} onClick={addToCart}>Add To Cart</button>
            <Link className={!hidden ? "hidden" : null} to="/sneakerverse/cart">You've added this shoe to your cart!</Link>
        </div>


    )
}

export default ProductDetail