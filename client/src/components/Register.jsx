import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import sneakerverse from '../../src/sneakerverseBK.png'


const Register = () => {
    const url = 'https://www.sneakerverse.net'
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})
    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: ""
    })

    const handleFormChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/users/register', userInfo, { withCredentials: true })
            .then(res => {
                // console.log(res)
                navigate("/login")

            })
            .catch(err => {
                console.log(`reg errer`, err)
                setErrors({
                    firstName: err.response.data.errors?.firstName,
                    lastName: err.response.data.errors?.lastName,
                    email: err.response.data.errors?.email,
                    phoneNumber: err.response.data.errors?.phoneNumber,
                    password: err.response.data.errors?.password,
                    confirmPassword: err.response.data.errors?.confirmPassword,
                })
            })
    }

    return (
        <div style={{ marginTop: "170px", marginBottom: "120px", display: 'flex', justifyContent: 'center', width: '900px', }}>
            <div style={{ display: 'flex' }}>
                <img src={`${url}/maria-fernanda-pissioli-DTZV8WDM1Ho-unsplash.jpg`} alt='Air force ones pointing towards the blue sky' width='100%' style={{ marginTop: 0 }} />
            </div>
            <form className='login-form' onSubmit={handleFormSubmit} style={{ padding: '10px 100px' }}>
                <img src={sneakerverse} alt="SneakerVerse" style={{ height: "70px", display: 'flex', marginTop: '10px' }} />
                <h2 style={{ width: '100%', textAlign: 'center', marginTop: '20px', whiteSpace: 'nowrap' }}>Register</h2>
                <p style={{ fontVariant: 'small-caps', textAlign: 'center', color: 'grey' }}>join the sneakerverse</p>
                <div>
                    {errors?.firstName ? <p style={{ color: "red" }}>{errors?.firstName.message}</p> : null}
                    <input type="text" name="firstName" value={userInfo.firstName} placeholder='First Name' onChange={handleFormChange} style={{ width: '100%' }} />
                </div>
                <div>
                    {errors?.lastName ? <p style={{ color: "red" }}>{errors?.lastName.message}</p> : null}
                    <input type="text" name="lastName" placeholder='Last Name' value={userInfo.lastName} onChange={handleFormChange} style={{ width: '100%' }} />
                </div>
                <div>
                    {errors?.email ? <p style={{ color: "red" }}>{errors?.email.message}</p> : null}
                    <input type="email" name="email" placeholder='Email Address' value={userInfo.email} onChange={handleFormChange} style={{ width: '100%' }} />
                </div>
                <div>
                    {errors?.phoneNumber ? <p style={{ color: "red" }}>{errors?.phoneNumber.message}</p> : null}
                    <input type="text" name="phoneNumber" placeholder='Phone Number' value={userInfo.phoneNumber} onChange={handleFormChange} style={{ width: '100%' }} />
                </div>
                <div>
                    {errors?.password ? <p style={{ color: "red" }}>{errors?.password.message}</p> : null}
                    <input type="password" name="password" placeholder='Password' value={userInfo.password} onChange={handleFormChange} style={{ width: '100%' }} />
                </div>
                <div>
                    {errors?.confirmPassword ? <p style={{ color: "red" }}>{errors?.confirmPassword.message}</p> : null}
                    <input type="password" name="confirmPassword" placeholder='Confirm Password' value={userInfo.confirmPassword} onChange={handleFormChange} style={{ width: '100%' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', margin: '10px' }}>
                    <button className='sign-in-btn' type="submit">Register</button>
                </div>
                <p style={{ textAlign: 'center', color: 'grey', whiteSpace: 'nowrap', marginBottom: '10px' }}>Already have an account? <Link style={{ color: '#198754' }} to={"/sneakerverse/login"}>Login!</Link></p>
            </form>
        </div>
    )
}

export default Register