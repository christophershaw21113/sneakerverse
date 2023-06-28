import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const AdminDashboard = (props) => {
    const { user, count, setCount } = props
    const [products, setProducts] = useState([])
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})
    const [shoe, setShoe] = useState({
        name: "",
        brand: "",
        price: 0,
        discountedPrice: 0,
        gender: "M",
        image: null,
        color: "",
        size: 0,
        description: "",
    })

    useEffect(() => {
        axios.get("http://localhost:8000/api/shoes")
            .then((res) => {
                setProducts(res.data)
                // console.log(res.data)
            })
    }, [count])

    const addShoe = (e) => {
        e.preventDefault();
        // try {
        axios.post('http://localhost:8000/api/shoes', shoe, { headers: { 'Content-Type': 'multipart/form-data', }, })
            .then((res) => {
                setCount(count + 1)
                setShoe({
                    name: "",
                    brand: "",
                    gender: "M",
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

    const removeShoe = (shoe) => {
        axios.delete(`http://localhost:8000/api/shoes/${shoe._id}`)
            .then(res => {
                setCount(count + 1)
            })
            .catch(err => console.log(err))
    }

    const editShoe = (id) => {
        navigate(`/editproduct/${id}`)
    }

    return (
        <div style={{ marginTop: "150px" }}>
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
                    <label>Color</label>
                    {errors?.color ? <p style={{ color: "red" }}>{errors?.color?.message}</p> : null}
                    <input type="text" name="color" value={shoe.color} onChange={handleChange} />
                </div>
                <div>
                    <label>Description</label>
                    {errors?.description ? <p style={{ color: "red" }}>{errors?.description?.message}</p> : null}
                    <input type="text" name="description" value={shoe.description} onChange={handleChange} />
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
                    <label>Size</label>
                    {errors?.size ? <p style={{ color: "red" }}>{errors?.size?.message}</p> : null}
                    <input type="number" name="size" value={shoe.size} onChange={handleChange} />
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
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>Price</th>
                        <th>Color</th>
                        <th>Size</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((shoe, index) => {
                        return (
                            <tr key={shoe._id}>
                                <td><><Link to={`/shoes/${shoe?._id}`}>{shoe?.name}</Link></></td>
                                <td>{shoe.brand}</td>
                                <p><strong style={{ textDecoration: 'line-through' }}>${shoe.price}</strong> <span style={{ color: 'red' }}>${shoe.discountedPrice}</span></p>
                                <td>{shoe.color}</td>
                                <td>{shoe.size}{shoe.gender}</td>
                                <td>{shoe.description}</td>
                                <td><img src={`http://localhost:8000/uploads/${shoe.image}`} alt="" style={{ width: "50px", height: "50px" }} /></td>
                                <td>
                                    { // delete if logged in user or 'admin' email user
                                        (user?.email === "t@w.com" || user?.email === "c@s.com") ? <><button onClick={() => removeShoe(shoe)}>🚮</button></> : null
                                    }
                                    { // delete if logged in user or 'admin' email user
                                        (user?.email === "t@w.com" || user?.email === "c@s.com") ? <><button onClick={() => editShoe(shoe._id)}>✏️</button></> : null
                                    }
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <br/><br/><br/>
        </div>
    )
}

export default AdminDashboard