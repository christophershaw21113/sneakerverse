import React, { useEffect, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

const ViewProducts = (props) => {
    const { user, count, setCount } = props
    const [products, setProducts] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:8000/api/shoes")
            .then((res) => {
                setProducts(res.data)
                // console.log(res.data)
            })
    }, [count])

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
        <div style={{ marginTop: "100px" }}>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>Gender</th>
                        <th>Price</th>
                        <th>Discounted Price </th>
                        <th>Color</th>
                        <th>Size</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((shoe, index) => {
                        return (
                            <tr key={shoe._id}>
                                <td><><Link to={`/shoes/${shoe?._id}`}>{shoe?.name}</Link></></td>
                                <td>{shoe.brand}</td>
                                <td>{shoe.gender}</td>
                                <td>{shoe.price}</td>
                                <td>{shoe.discountedPrice}</td>
                                <td>{shoe.color}</td>
                                <td>{shoe.size}</td>
                                <td>{shoe.description}</td>
                                <td><img src={`http://localhost:8000/uploads/${shoe.image}`} alt="" style={{width:"50px", height:"50px"}}/></td>
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
        </div>
    )
}

export default ViewProducts