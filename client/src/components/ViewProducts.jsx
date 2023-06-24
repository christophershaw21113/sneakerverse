import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const ViewProducts = (props) => {
    const { user, count, setCount } = props
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8000/api/shoes")
            .then((res) => {
                setProducts(res.data.shoes)
                console.log(res.data.shoes)
            })
    }, [count])

    const removeShoe = (shoe) => {
        axios.delete(`http://localhost:8000/api/shoes/${shoe._id}`)
            .then(res => {
                setCount(count + 1)
            })
            .catch(err => console.log(err))
    }

    return (
        <div style={{ marginTop: "100px" }}>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th >Brand</th>
                        <th >Added By</th>
                        <th >Date Added </th>
                        <th >Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((shoe, index) => {
                        return (
                            <tr key={shoe._id}>
                                <td ><><Link to={`/shoes/${shoe?._id}`}>{shoe?.name}</Link></></td>
                                <td >{shoe.author}</td>
                                <td >{shoe?.addedBy?._id ? <p className='mb-1'><img className="profilePicture" src={shoe.addedBy.profilePicture} alt="" style={{ width: "40px", height: "40px" }} /> <Link to={`/users/${shoe?.addedBy?._id}`}>@{shoe?.addedBy?.displayName}</Link></p> : <p>(Deleted User @{shoe?.addedByString})</p>}</td>
                                <td >{new Date(shoe.createdAt).toLocaleString()}</td>
                                <td >
                                    { // delete if logged in user or 'admin' email user
                                        (user.firstName === (products[index]?.addedBy?.firstName) || user?.email === "t@w.com" || user.email === "c@s.com") ? <><button onClick={() => removeShoe(shoe)}>🚮</button></> : null
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