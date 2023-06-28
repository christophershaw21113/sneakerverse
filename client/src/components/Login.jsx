import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'


const Login = (props) => {
    const { count, setCount, loggedIn, setLoggedIn } = props
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: ""
    })

    const handleFormChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/users/login', userInfo, { withCredentials: true })
            .then(res => {
                // console.log(res)
                navigate("/")
                setLoggedIn(true)
                setCount(count + 1)
                window.location.reload()
            })
            .catch(err => {
                console.log(`log errer`, err)
                setErrors({
                    logErr: err.response?.data?.logErrMsg
                })
            })
    }
    return (
        <div style={{ marginTop: "150px" }}>
            <form onSubmit={handleFormSubmit}>
                <h3>Login</h3>
                {errors?.logErr ? <p style={{ color: "red" }}>{errors.logErr}</p> : null}
                <div>
                    <label>Email</label>
                    <input type="email" name="email" value={userInfo.email} onChange={handleFormChange} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={userInfo.password} onChange={handleFormChange} />
                </div>

                <div>
                    <button type="submit">Login</button>
                </div>
                <p>Need an account? <Link to={"/register"}>Register!</Link></p>
            </form>
        </div>
    )
}

export default Login