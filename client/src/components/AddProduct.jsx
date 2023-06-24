import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import jwtdecode from 'jwt-decode'

const AddProduct = (props) => {
    const { cookieValue } = props
    const [shoeList, setShoeList] = useState([])
    const [errors, setErrors] = useState({})
    const [selectedFile, setSelectedFile] = useState(null)
    const [file, setFile] =useState()

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

    const addShoe = async (e) => {
        e.preventDefault()

        try {
            const uploadResponse = await axios.post('http://localhost:8000/api/save', selectedFile)

            const uploadedPhotoUrl = `http://localhost:8000/uploads/${uploadResponse.data.photo}`

            await axios.patch(`http://localhost:8000/api/shoes/addPicture`, { image: uploadedPhotoUrl }, { headers: { 'Authorization': `${cookieValue}` } })

            console.log("Successfully updated shoe picture!")
        } catch (error) {
            if (error.response.status === 403) {
                window.alert("You can not edit another user's profile!")
            } else {
                console.error('Error uploading file:', error)
                window.alert("Error uploading profile picture. Please make sure it is an image type of .PNG, .JPG, or .JPEG and below 3MB.")
            }
        }


        axios.post('http://localhost:8000/api/shoes', shoe, { withCredentials: true })
            .then(res => {
                setShoeList([...shoeList, res.data.shoe])
                setShoe({
                    name: "",
                    brand: "",
                    price: 0,
                    discountedPrice: 0,
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
        const filename = jwtdecode(cookieValue).firstName + '-' + Date.now() + '-' + e.target.files[0].name
        formData.append('photo', e.target.files[0], filename)
        setSelectedFile(formData)
    }

    const handleFileUpload = async () => {
        try {
            const uploadResponse = await axios.post('http://localhost:8000/api/save', selectedFile)

            const uploadedPhotoUrl = `http://localhost:8000/uploads/${uploadResponse.data.photo}`

            await axios.patch(`http://localhost:8000/api/shoes/addPicture`, { image: uploadedPhotoUrl }, { headers: { 'Authorization': `${cookieValue}` } })

            // navigate(`/users/${id}`)
            // setCount(count + 1)
            console.log("Successfully updated profile picture!")
        } catch (error) {
            if (error.response.status === 403) {
                window.alert("You can not edit another user's profile!")
            } else {
                console.error('Error uploading file:', error)
                window.alert("Error uploading profile picture. Please make sure it is an image type of .PNG, .JPG, or .JPEG and below 3MB.")
            }
        }
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
                    <input type="file" name="image" onChange={e=>setFile(e.target.files[0])} />
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

            <div className="input-group mb-3">
                <input className="form-control custom-input" type="file" id="formFile" onChange={e=>setFile(e.target.files[0])} />
                <button type="button" className="btn btn-success" disabled={!selectedFile} onClick={handleFileUpload}>Upload</button>
            </div>
        </div>
    )
}

export default AddProduct