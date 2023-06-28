import React, { useState, useEffect } from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Navigate } from 'react-router-dom';

const Cart = (props) => {
    const { order, setOrder } = props
    const [subtotal, setSubtotal] = useState(0)

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
    }, [order])

    return (
        <div style={{ marginTop: "150px" }}>
            <h3 style={{textAlign:"center"}}>Cart</h3>
            <br/>
            {
                order.map((shoe, index) => {
                    return (
                        <div key={shoe._id} style={{ display: "flex", width: "300px" }}>
                            <div>
                                <img src={`http://localhost:8000/uploads/${shoe.image}`} alt={shoe.name} style={{ width: "50px" }} />
                            </div>
                            <div>
                                <p>Shoe: {shoe.brand} {shoe.name}</p>
                                <p>Size: {shoe.size}{shoe.gender}</p>
                                <p>Color: {shoe.color}</p>
                                <p>Price: <span style={{ textDecoration: 'line-through' }}>${shoe.price}</span><span style={{color: 'red'}}> ${shoe.discountedPrice}</span></p>
                            </div>
                            <button onClick={() => removeFromCart(index)}>Remove</button>
                            <br /><br /><br />
                        </div>
                    )
                })
            }
            {
                order.length > 0 ?
                    <>
                        <br />
                        <p style={{ textAlign: "center" }}>Subtotal: ${subtotal}</p>
                        <br />
                        <div style={{ width: "300px" }}>
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
                                                setOrder({})
                                                Navigate("/")
                                                return orderId;
                                            });
                                    }}
                                    onApprove={function (data, actions) {
                                        return actions.order.capture().then(function (details) {
                                            // Your code here after capture the order
                                            alert("Transaction completed by " + details.payer.name.given_name)
                                        });
                                    }} />
                            </PayPalScriptProvider>
                        </div>
                    </>
                    :
                    <p style={{textAlign:"center", marginTop:"150px"}}>Your cart is empty!</p>
            }
        </div>
    )
}

export default Cart