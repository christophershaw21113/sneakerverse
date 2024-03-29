import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useMediaQuery } from 'react-responsive';

const AdminDashboard = (props) => {
    const { user, count, setCount } = props
    const [products, setProducts] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})
    const [currentPage, setCurrentPage] = useState(1)


    const isSmallScreen = useMediaQuery({ maxWidth: '500px' });
    console.log("isSmallScreen", isSmallScreen)
    const [shoe, setShoe] = useState({
        name: "",
        brand: "",
        price: 0,
        discountedPrice: 0,
        gender: "M",
        image: 0,
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
                    image: 0,
                    color: "",
                    size: 0,
                    description: ""
                })
                setErrors({})
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

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value)
    }
    const handleSearch = (e) => {
        e.preventDefault()
        axios.get('http://localhost:8000/api/shoes', { params: { search: searchQuery } })
            .then((res) => {
                const searchedResults = res.data.filter((shoe) => shoe.brand.toLowerCase().includes(searchQuery.toLowerCase()) || shoe.name.toLowerCase().includes(searchQuery.toLowerCase()) || shoe.color.toLowerCase().includes(searchQuery.toLowerCase()))
                setProducts(searchedResults)
                setCurrentPage(1)
            })
            .catch((err) => console.log(err))
    }

    // Pagination
    const itemsPerPage = 5
    const totalPages = Math.ceil(products.length / itemsPerPage)
    const pageNumbers = []

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
    }

    const indexOfLastProduct = currentPage * itemsPerPage
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className='admin-container'>
            <h2 style={{ textAlign: 'center' }}>Admin Dashboard</h2>
            <p style={{ textAlign: 'center' }}>Shoe Creator</p>
            <form className='admin-dash' onSubmit={addShoe}>
                <div>
                    <div className='form-divs'>
                        {errors?.generic ? <p style={{ color: "red" }}>{errors?.generic?.message}</p> : null}
                        <label>Name</label>
                        {errors?.name ? <p style={{ color: "red" }}>{errors?.name?.message}</p> : null}
                        <input type="text" name="name" placeholder='Name' value={shoe.name} onChange={handleChange} />
                    </div>
                    <div className='form-divs'>
                        <label>Brand</label>
                        {errors?.brand ? <p style={{ color: "red" }}>{errors?.brand?.message}</p> : null}
                        <input type="text" name="brand" placeholder='Brand' value={shoe.brand} onChange={handleChange} />
                    </div>
                    <div className='form-divs'>
                        <label>Color</label>
                        {errors?.color ? <p style={{ color: "red" }}>{errors?.color?.message}</p> : null}
                        <input type="text" name="color" placeholder='Color' value={shoe.color} onChange={handleChange} />
                    </div>
                </div>
                <div>
                    <div className='form-divs'>
                        <label>Description</label>
                        {errors?.description ? <p style={{ color: "red" }}>{errors?.description?.message}</p> : null}
                        <input type="text" name="description" placeholder='Description' value={shoe.description} onChange={handleChange} />
                    </div>
                    <div className='form-divs'>
                        <label>Gender</label>
                        {errors?.gender ? <p style={{ color: "red" }}>{errors?.gender?.message}</p> : null}
                        <select style={{ width: '100%', marginTop: '10px' }} name="gender" id="gender" onChange={handleChange}>
                            <option value="" disabled selected>Select a Gender</option>
                            <option value="M">M</option>
                            <option value="F">F</option>
                        </select>
                    </div>
                    <div className='form-divs'>
                        <label>Size</label>
                        {errors?.size ? <p style={{ color: "red" }}>{errors?.size?.message}</p> : null}
                        <input type="number" name="size" value={shoe.size} placeholder='Shoe Size' onChange={handleChange} />
                    </div>
                </div>
                <div>
                    <div className='form-divs'>
                        <label>Price</label>
                        {errors?.price ? <p style={{ color: "red" }}>{errors?.email?.message}</p> : null}
                        <input type="number" name="price" value={shoe.price} placeholder='Price' onChange={handleChange} />
                    </div>
                    <div className='form-divs'>
                        <label>Discounted Price</label>
                        {errors?.discountedPrice ? <p style={{ color: "red" }}>{errors?.discountedPrice?.message}</p> : null}
                        <input type="number" placeholder='Discounted Price' name="discountedPrice" value={shoe.discountedPrice} onChange={handleChange} />
                    </div>
                    <div className='form-divs'>
                        {errors?.image ? <p style={{ color: "red" }}>{errors?.image?.message}</p> : null}
                        <input id="file-input" class="file-input-label" type="file" name="image" onChange={handleChange} />
                    </div>
                    <button className='admin-btn' type="submit">Submit</button>
                </div>
            </form>
            <form onSubmit={handleSearch} style={{ textAlign: "center" }}>
                <input className='search-sneaks' type="text" value={searchQuery} onChange={handleSearchInputChange} placeholder='Sneaker Searcher' />
                <button className='search-btn' onClick={handleSearch}>Search</button>
            </form>
            <table className='admin-table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>Price</th>
                        {isSmallScreen ?
                            null :
                            <th>Color</th>
                        }
                        <th>Size</th>
                        {isSmallScreen ?
                            null :
                            <th>Description</th>
                        }
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentProducts
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((shoe, index) => {
                            return (
                                <tr key={shoe._id}>
                                    <td><><Link className='product-name' to={`/shoes/${shoe?._id}`}>{shoe?.name}</Link></></td>
                                    <td className='product-brand'>{shoe.brand}</td>
                                    <td className='product-price'><strong style={{ textDecoration: 'line-through' }}>${shoe.price}</strong> <span style={{ color: 'red' }}>${shoe.discountedPrice}</span></td>
                                    {isSmallScreen ?
                                        null :
                                        <td className='product-color'>{shoe.color}</td>
                                    }
                                    <td className='product-size'>{shoe.size}{shoe.gender}</td>
                                    {isSmallScreen ?
                                        null :
                                        <td className='product-description'>{shoe.description}</td>
                                    }
                                    <td className='product-image'><img src={`http://localhost:8000/uploads/${shoe.image}`} alt="" style={{ width: "100px" }} /></td>
                                    <td>
                                        { // delete if logged in user or 'admin' email user
                                            (user?.email === "t@w.com" || user?.email === "c@s.com") ? <><button style={{ width: '50px', border: 'none' }} onClick={() => removeShoe(shoe)}>🚮</button></> : null
                                        }
                                        { // delete if logged in user or 'admin' email user
                                            (user?.email === "t@w.com" || user?.email === "c@s.com") ? <><button style={{ width: '50px', border: 'none' }} onClick={() => editShoe(shoe._id)}>✏️</button></> : null
                                        }
                                    </td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>
            <div className="custom-pagination" style={{ marginBottom: "100px" }}>
                <ul className="pagination">
                    {pageNumbers.map((pageNumber) => (
                        <li style={{ textAlign: 'center' }} key={pageNumber} className={`page-item ${pageNumber === currentPage ? 'active' : ''}`}>
                            <button onClick={() => handlePageChange(pageNumber)} className="page-link">
                                {pageNumber}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default AdminDashboard