import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const EditProduct = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})
    const [oneShoe, setOneShoe] = useState({})
    useEffect(() => {
        axios.get(`http://localhost:8000/api/shoes/${id}`)
            .then(res => {
                console.log(res.data)
                setOneShoe(res.data)
            })
            .catch(err => console.log(err))
        // eslint-disable-next-line
    }, [])

    const editShoe = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("name", oneShoe.name);
        formData.append("brand", oneShoe.brand);
        formData.append("gender", oneShoe.gender);
        formData.append("price", oneShoe.price);
        formData.append("discountedPrice", oneShoe.discountedPrice);
        formData.append("color", oneShoe.color);
        formData.append("size", oneShoe.size);
        formData.append("description", oneShoe.description);
        formData.append("image", e.target.image.files[0]);

        axios.put(`http://localhost:8000/api/shoes/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data', }, })
            .then(res => {
                console.log(oneShoe)
                navigate(`/viewProducts`)
            })
            .catch(err => {
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
                    data: err.response.data
                })
            })

    }
    const handleChange = (e) => {
        setOneShoe({
            ...oneShoe,
            [e.target.name]: e.target.value
        })
    }
    return (
        <div style={{ marginTop: "100px" }}>
            <h1>Edit Shoe Details</h1>
            <form action="" className='col-md-6 mx-auto' onSubmit={editShoe}>
                {/* {oneShoe.oneShoe?.length < 2 ? <p className="text-danger">FE: Title must be at least 2 characters</p> : null} */}
                {/* {errors.oneShoe ? <p className="text-danger">{errors.oneShoe.message}</p> : null} */}
                <div>
                    <label>Name</label>
                    {/* {errors?.name ? <p style={{ color: "red" }}>{errors?.name.message}</p> : null} */}
                    <input type="text" name="name" value={oneShoe.name} onChange={handleChange} />
                </div>
                <div>
                    <label>Brand</label>
                    {/* {errors?.brand ? <p style={{ color: "red" }}>{errors?.brand.message}</p> : null} */}
                    <input type="text" name="brand" value={oneShoe.brand} onChange={handleChange} />
                </div>
                <div>
                    <label>Gender</label>
                    {/* {errors?.gender ? <p style={{ color: "red" }}>{errors?.gender.message}</p> : null} */}
                    <select name="gender" id="gender">
                        <option value="M">M</option>
                        <option value="F">F</option>
                    </select>
                </div>
                <div>
                    <label>Price</label>
                    {/* {errors?.price ? <p style={{ color: "red" }}>{errors?.email.message}</p> : null} */}
                    <input type="number" name="price" value={oneShoe.price} onChange={handleChange} />
                </div>
                <div>
                    <label>Discounted Price</label>
                    {/* {errors?.discountedPrice ? <p style={{ color: "red" }}>{errors?.discountedPrice.message}</p> : null} */}
                    <input type="number" name="discountedPrice" value={oneShoe.discountedPrice} onChange={handleChange} />
                </div>
                <div>
                    <label>Color</label>
                    {/* {errors?.color ? <p style={{ color: "red" }}>{errors?.color.message}</p> : null} */}
                    <input type="text" name="color" value={oneShoe.color} onChange={handleChange} />
                </div>
                <div>
                    <label>Size</label>
                    {/* {errors?.size ? <p style={{ color: "red" }}>{errors?.size.message}</p> : null} */}
                    <input type="text" name="size" value={oneShoe.size} onChange={handleChange} />
                </div>
                <div>
                    <label>Description</label>
                    {/* {errors?.description ? <p style={{ color: "red" }}>{errors?.description.message}</p> : null} */}
                    <input type="text" name="description" value={oneShoe.description} onChange={handleChange} />
                </div>
                <div>
                    <label>Image</label>
                    {/* {errors?.image ? <p style={{ color: "red" }}>{errors?.image.message}</p> : null} */}
                    <input type="file" name="image" accept="image/*" onChange={handleChange} />
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default EditProduct