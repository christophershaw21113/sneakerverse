import React, { useState } from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Cart = () => {
    const [amount, setAmount] = useState(0.01)
    return (
        <div>
            <div style={{ width: "100px" }}>
                <PayPalScriptProvider options={{ clientId: "ASko_BfBKO1FH_ii4zyZl2x8rTn4qzVh931bRX6poAGg1M-Uv7yFDOA4EESp1zC1LuQoHHFRKtcH49BG" }}>
                    <PayPalButtons
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        amount: {
                                            currency_code: "USD",
                                            value: amount,
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