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
        if (oneShoe.name && oneShoe.brand && oneShoe.price && oneShoe.color && oneShoe.size && oneShoe.description) {
            axios.put(`http://localhost:8000/api/shoes/${id}`, oneShoe)
                .then(res => {
                    console.log(oneShoe)
                    navigate(`/sneakerverse/adminDashboard`)
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
                        data: err.response.data
                    })
                })
        }
        else {
            alert("A required field is empty")
        }
    }

    const editShoeImage = (e) => {
        e.preventDefault()

        axios.put(`http://localhost:8000/api/shoes/${id}/image`, { image: e.target.image.files[0] }, { headers: { 'Content-Type': 'multipart/form-data', }, })
            .then(res => {
                console.log(oneShoe)
                navigate(`/sneakerverse/adminDashboard`)
            })
            .catch(err => {
                console.log(err)
                setErrors({
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
        <div className='admin-container'>
            <h2 style={{ textAlign: 'center' }}>Edit Shoe Details</h2>
            <form className='admin-dash' onSubmit={editShoe}>
                {/* {oneShoe.oneShoe?.length < 2 ? <p className="text-danger">FE: Title must be at least 2 characters</p> : null} */}
               
               <div> {/* {errors.oneShoe ? <p className="text-danger">{errors.oneShoe.message}</p> : null} */}
               <div className='form-divs'>
                    <label>Name</label>
                    {errors?.name ? <p style={{ color: "red" }}>{errors?.name.message}</p> : null}
                    <input type="text" name="name" value={oneShoe.name} onChange={handleChange} />
                </div>
                <div className='form-divs'>
                    <label>Brand</label>
                    {/* {errors?.brand ? <p style={{ color: "red" }}>{errors?.brand.message}</p> : null} */}
                    <input type="text" name="brand" value={oneShoe.brand} onChange={handleChange} required />
                </div>
                <div className='form-divs'>
                    <label>Color</label>
                    {/* {errors?.color ? <p style={{ color: "red" }}>{errors?.color.message}</p> : null} */}
                    <input type="text" name="color" value={oneShoe.color} onChange={handleChange} required />
                </div>
                </div>
                <div>
                <div className='form-divs'>
                    <label>Description</label>
                    {/* {errors?.description ? <p style={{ color: "red" }}>{errors?.description.message}</p> : null} */}
                    <input type="text" name="description" value={oneShoe.description} onChange={handleChange} required />
                </div>
                <div className='form-divs'>
                    <label>Gender</label>
                    {/* {errors?.gender ? <p style={{ color: "red" }}>{errors?.gender.message}</p> : null} */}
                    <select style={{ width: '100%', marginTop: '10px' }} name="gender" id="gender">
                        <option value="M">M</option>
                        <option value="F">F</option>
                    </select>
                </div>
                <div className='form-divs'>
                    <label>Size</label>
                    {/* {errors?.size ? <p style={{ color: "red" }}>{errors?.size.message}</p> : null} */}
                    <input type="number" name="size" value={oneShoe.size} onChange={handleChange} required />
                </div>
                </div>
                 <div>
                 <div className='form-divs'>
                    <label>Price</label>
                    {/* {errors?.price ? <p style={{ color: "red" }}>{errors?.email.message}</p> : null} */}
                    <input type="number" name="price" value={oneShoe.price} onChange={handleChange} required />
                </div>
                <div className='form-divs'>
                    <label>Discounted Price</label>
                    {/* {errors?.discountedPrice ? <p style={{ color: "red" }}>{errors?.discountedPrice.message}</p> : null} */}
                    <input type="number" name="discountedPrice" value={oneShoe.discountedPrice} onChange={handleChange} />
                </div>
                    <button style={{display: 'flex', justifyContent: 'center', backgroundColor: '#000', color:'#fff', padding: '10px 15px', width: '200px', border: 'none', borderRadius: '15px' }} type="submit">Update</button>
                </div>
            </form>
            <br />
            <form onSubmit={editShoeImage} style={{textAlign:"center"}}>
                  
                    {/* {errors?.image ? <p style={{ color: "red" }}>{errors?.image.message}</p> : null} */}
                    <input style={{marginBottom: '10px', marginLeft: '50px'}} type="file" name="image" accept="image/*" onChange={handleChange} />
                    <button style={{display: 'flex', justifyContent: 'center', backgroundColor: '#198754', color:'#fff', padding: '10px 15px', width: '200px', border: 'none', borderRadius: '15px' }} type="submit">Submit</button>
            </form>
        </div>
    )
}

export default EditProduct