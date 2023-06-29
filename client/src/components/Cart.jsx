import React, { useState, useEffect } from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const Cart = (props) => {
    const { order, setOrder } = props
    const [subtotal, setSubtotal] = useState(0)
    const navigate = useNavigate()
    const removeFromCart = (index) => {
        setOrder(order.filter((shoe, i) => { return order[i] !== order[index] }))
    }

    const calculateSubtotal = () => {
        let total = 0
        order.forEach((shoe) => {
            total += shoe.discountedPrice
        });
        setSubtotal(total)
    }

    useEffect(() => {
        calculateSubtotal()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [order])

    const isSmallScreen = useMediaQuery({ maxWidth: '965px' });
    const pageContainer = {
        marginTop: isSmallScreen ? '40%' : '15%',
        width: '70%',
    };

    return (
        <div style={pageContainer}>
            <h2 style={{ textAlign: "center", marginBottom: '20px' }}>Checkout</h2>
            <div className='cart-container'>
                <div>
                    {
                        order.map((shoe, index) => {
                            return (
                                <div className='left-col' key={shoe._id} style={{ display: "flex", width: "100%" }}>
                                    <div>
                                        <img src={`http://localhost:8000/uploads/${shoe.image}`} alt={shoe.name} style={{ width: "200px" }} />
                                    </div>
                                    <div>
                                        <p>Shoe: {shoe.brand} {shoe.name}</p>
                                        <p>Size: {shoe.size}{shoe.gender}</p>
                                        <p>Color: {shoe.color}</p>
                                        <p>Price: <span style={{ textDecoration: 'line-through' }}>${shoe.price}</span><span style={{ color: 'red' }}> ${shoe.discountedPrice}</span></p>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
                                        <button id='remove-cart-btn' onClick={() => removeFromCart(index)}>Remove</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    {
                        order.length > 0 ?
                            <>
                                <p style={{ textAlign: "center", margin: '10px', fontWeight: 'bold' }}>Subtotal: ${subtotal}</p>
                                <div className='paypal-container' style={{ width: "300px" }}>
                                    <PayPalScriptProvider options={{ clientId: "Abzd4jCbn39gBLQLtSb8cBqN-Xb4AIEB53pjtJSjE8-y5kNbdAPbBGE2NZ_i-lVLjUfbTz5hRCLneRuB" }}>
                                        <PayPalButtons
                                            createOrder={(data, actions) => {
                                                return actions.order.create({
                                                    purchase_units: [
                                                        {
                                                            amount: {
                                                                currency_code: "USD",
                                                                value: subtotal,
                                                            },
                                                        },
                                                    ],
                                                })
                                                    .then((orderId) => {
                                                        console.log(orderId)
                                                        return orderId;
                                                    });
                                            }}
                                            onApprove={function (data, actions) {
                                                return actions.order.capture().then(function (details) {
                                                    // Your code here after capture the order
                                                    // setOrder({})
                                                    // navigate("/")
                                                    alert("Transaction completed by " + details.payer.name.given_name)
                                                });
                                            }} />
                                    </PayPalScriptProvider>
                                </div>
                            </>
                            :
                            <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                                <p style={{ textAlign: 'center', marginTop: '50px' }}>Your cart is empty!</p>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Cart