import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import jwtdecode from 'jwt-decode'

const AddProduct = (props) => {
    const { cookieValue } = props
    const [shoeList, setShoeList] = useState([])
    const [errors, setErrors] = useState({})

    const [shoe, setShoe] = useState({
        name: "",
        brand: "",
        gender: "",
        price: 0,
        discountedPrice: 0,
        gender: "M",
        image: null,
        color: "",
        size: 0,
        description: "",
    })

    const addShoe =  (e) => {
        e.preventDefault();

        // try {
            axios.post('http://localhost:8000/api/shoes', shoe, { headers: { 'Content-Type': 'multipart/form-data', }, })
                .then((res) => {
                    setShoe({
                        name: "",
                        brand: "",
                        gender: "",
                        price: 0,
                        discountedPrice: 0,
                        image: null,
                        color: "",
                        size: 0,
                        description: ""
                    })
                })
                .catch((err) => {
                    console.log(err)
                    setErrors({
                        name: err.response.data.error.errors?.name,
                        brand: err.response.data.error.errors?.brand,
                        gender: err.response.data.error.errors?.gender,
                        price: err.response.data.error.errors?.price,
                        discountedPrice: err.response.data.error.errors?.discountedPrice,
                        color: err.response.data.error.errors?.color,
                        size: err.response.data.error.errors?.size,
                        description: err.response.data.error.errors?.description,
                        image: err.response.data.error.errors?.image,
                        generic: err.response.data
                    })
                })
        // }
        // catch (error) {
        //     console.error('Error uploading sneaker:', error);
        // }
    };

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            setShoe({ ...shoe, image: e.target.files[0] });
        } else {
            setShoe({ ...shoe, [e.target.name]: e.target.value });
        }
    };


    return (
        <div style={{ marginTop: "100px" }}>
            <form onSubmit={addShoe}>
                <h3>Add a shoe</h3>
                <div>
                    {errors?.generic ? <p style={{ color: "red" }}>{errors?.generic?.message}</p> : null}
                    <label>Name</label>
                    {errors?.name ? <p style={{ color: "red" }}>{errors?.name?.message}</p> : null}
                    <input type="text" name="name" value={shoe.name} onChange={handleChange} />
                </div>
                <div>
                    <label>Brand</label>
                    {errors?.brand ? <p style={{ color: "red" }}>{errors?.brand?.message}</p> : null}
                    <input type="text" name="brand" value={shoe.brand} onChange={handleChange} />
                </div>
                <div>
                    <label>Gender</label>
                    {errors?.gender ? <p style={{ color: "red" }}>{errors?.gender?.message}</p> : null}
                    <select name="gender" id="gender" onChange={handleChange}>
                        <option value="M">M</option>
                        <option value="F">F</option>
                    </select>
                </div>
                <div>
                    <label>Price</label>
                    {errors?.price ? <p style={{ color: "red" }}>{errors?.email?.message}</p> : null}
                    <input type="number" name="price" value={shoe.price} onChange={handleChange} />
                </div>
                <div>
                    <label>Discounted Price</label>
                    {errors?.discountedPrice ? <p style={{ color: "red" }}>{errors?.discountedPrice?.message}</p> : null}
                    <input type="number" name="discountedPrice" value={shoe.discountedPrice} onChange={handleChange} />
                </div>
                <div>
                    <label>Color</label>
                    {errors?.color ? <p style={{ color: "red" }}>{errors?.color?.message}</p> : null}
                    <input type="text" name="color" value={shoe.color} onChange={handleChange} />
                </div>
                <div>
                    <label>Size</label>
                    {errors?.size ? <p style={{ color: "red" }}>{errors?.size?.message}</p> : null}
                    <input type="text" name="size" value={shoe.size} onChange={handleChange} />
                </div>
                <div>
                    <label>Description</label>
                    {errors?.description ? <p style={{ color: "red" }}>{errors?.description?.message}</p> : null}
                    <input type="text" name="description" value={shoe.description} onChange={handleChange} />
                </div>
                <div>
                    <label>Image</label>
                    {errors?.image ? <p style={{ color: "red" }}>{errors?.image?.message}</p> : null}
                    <input type="file" name="image" onChange={handleChange} />
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default AddProduct