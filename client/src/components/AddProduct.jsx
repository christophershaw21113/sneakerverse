import React, { useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import jwtdecode from 'jwt-decode'

const AddProduct = (props) => {
    const {cookieValue} = props
    const [shoeList, setShoeList] = useState([])
    const [errors, setErrors] = useState({})
    const [selectedFile, setSelectedFile] = useState(null)

    const [shoe, setShoe] = useState({
        name: "",
        brand: "",
        price: 0,
        discountedPrice: 0,
        image: "",
        color: "",
        sizes: [],
        description: ""
    })

    const addShoe = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/shoes', shoe, { withCredentials: true })
            .then(res => {
                setShoeList([...shoeList, res.data.shoe])
                setShoe({
                    name: "",
                    brand: "",
                    price: 0,
                    discountedPrice: 0,
                    image: "",
                    color: "",
                    sizes: [],
                    description: ""
                })
                setErrors({
                    title: "",
                    author: ""
                })
                // setCount(count + 1)
            })
            .catch(err => {
                console.log(`submit errer`, err)
                // if (err === 'AxiosError') {
                //     setErrors({
                //         title: err.response.data.error.errors,
                //         author: err.response.data.error.errors.author
                //     })
                // }
                console.log(errors)
            })
    }

    const changeHandler = (e) => {
        setShoe({
            ...shoe,
            [e.target.name]: e.target.value
        })
    }
    const handleFileSelect = (e) => {
        e.preventDefault()
        const formData = new FormData()
        const filename = jwtdecode(cookieValue).displayName + '-' + Date.now() + '-' + e.target.files[0].name
        formData.append('photo', e.target.files[0], filename)
        setSelectedFile(formData)
    }

    return (
        <div style={{ marginTop: "100px" }}>
            <form onSubmit={addShoe}>
                <h3>Add a shoe</h3>
                <div>
                    <label>Name</label>
                    {errors?.firstName ? <p style={{ color: "red" }}>{errors?.name.message}</p> : null}
                    <input type="text" name="name" value={shoe.firstName} onChange={changeHandler} />
                </div>
                <div>
                    <label>Brand</label>
                    {errors?.brand ? <p style={{ color: "red" }}>{errors?.brand.message}</p> : null}
                    <input type="text" name="brand" value={shoe.brand} onChange={changeHandler} />
                </div>
                <div>
                    <label>Price</label>
                    {errors?.price ? <p style={{ color: "red" }}>{errors?.email.message}</p> : null}
                    <input type="number" name="price" value={shoe.price} onChange={changeHandler} />
                </div>
                <div>
                    <label>Discounted Price</label>
                    {errors?.discountedPrice ? <p style={{ color: "red" }}>{errors?.discountedPrice.message}</p> : null}
                    <input type="number" name="discountedPrice" value={shoe.discountedPrice} onChange={changeHandler} />
                </div>
                <div>
                    <label>Image</label>
                    {errors?.image ? <p style={{ color: "red" }}>{errors?.image.message}</p> : null}
                    <input type="file" name="image" value={shoe.image} onChange={handleFileSelect} />
                </div>
                <div>
                    <label>Color</label>
                    {errors?.color ? <p style={{ color: "red" }}>{errors?.color.message}</p> : null}
                    <input type="text" name="color" value={shoe.color} onChange={changeHandler} />
                </div>
                <div>
                    <label>Sizees</label>
                    {errors?.sizes ? <p style={{ color: "red" }}>{errors?.color.message}</p> : null}
                    <input type="text" name="sizes" value={shoe.sizes} onChange={changeHandler} />
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default AddProduct