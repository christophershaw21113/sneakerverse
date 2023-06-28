import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';

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

    return (
        <div style={{ marginTop: "150px", width: "50%" }}>

            <Link to="/">Home</Link>
            <br />
            <img src={`http://localhost:8000/uploads/${shoe.image}`} alt={shoe.name} style={{ width: "100px" }} />
            <h2>Shoe: {shoe.brand} {shoe.name}</h2>
            <h3>Price: <span style={{ textDecoration: 'line-through' }}>${shoe.price}</span><span style={{color: 'red'}}> ${shoe.discountedPrice}</span></h3>
            <h5>Color: {shoe.color}</h5>
            <h5>Size: {shoe.size} {shoe.gender}</h5>
            <p>Description: {shoe.description}</p>
            <br />
            <button className={hidden ? "hidden" : null} onClick={addToCart}>Add To Cart</button>
            <Link className={!hidden ? "hidden" : null} to="/cart">You've added this shoe to your cart!</Link>
        </div>
    )
}

export default ProductDetail;