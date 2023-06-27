import React, { useState, useEffect } from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

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
        <div style={{ marginTop: "100px" }}>
            {
                order.map((shoe, index) => {
                    return (
                        <div key={shoe._id} style={{ display: "flex", width: "200px" }}>
                            <div>
                                <img src={`http://localhost:8000/uploads/${shoe.image}`} alt={shoe.name} style={{ width: "50px" }} />
                            </div>
                            <div>
                                <p>Brand: {shoe.brand}</p>
                                <p>Size: {shoe.size}{shoe.gender}</p>
                                <p>Price: <span style={{color:'red', textDecoration:'line-through'}}>${shoe.price}</span> ${shoe.discountedPrice}</p>
                                <p>Color: {shoe.color}</p>
                            </div>
                            <button onClick={() => removeFromCart(index)}>Remove</button>
                            <br /><br /><br/>
                        </div>
                    )
                })
            }
            <p>Subtotal: {subtotal}</p>
            <div style={{ width: "100px" }}>
                <PayPalScriptProvider options={{ clientId: "ASko_BfBKO1FH_ii4zyZl2x8rTn4qzVh931bRX6poAGg1M-Uv7yFDOA4EESp1zC1LuQoHHFRKtcH49BG" }}>
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
                                    // Your code here after create the order
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
        </div>
    )
}

export default Cart