import React, { useState } from 'react';
import axios from 'axios';

const SneaksAPI = () => {
    const [sneakerName, setSneakerName] = useState('');
    const [product, setProduct] = useState(null);

    const handleSearch = () => {
        // Fetch the product information from the backend
        axios.get(`http://localhost:8000/api/product?sneakerName=${sneakerName}`)
            .then((response) => {
                // Store the product information in the component's state
                setProduct(response.data);
            })
            .catch((error) => {
                console.log('Error:', error);
            });
    };

    return (
        <div style={{ marginTop: "100px" }}>
            <input type="text" value={sneakerName} onChange={(e) => setSneakerName(e.target.value)} />
            <button onClick={handleSearch}>Search</button>

            {product ? (
                <div>
                    {/* Display the product information */}
                    <h2>{product.name}</h2>
                    <img src={product.image} alt={product.name} />
                    <p>{product.description}</p>
                </div>
            ) : (
                <div>No product found.</div>
            )}
        </div>
    );
};

export default SneaksAPI;
