import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'


const Login = () => {
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

            })
            .catch(err => {
                console.log(`log errer`, err)
                setErrors({
                    email: err.response.data,
                    password: err.response.data,
                })
            })
    }
    return (
        <div style={{marginTop: "100px"}}>
            <form onSubmit={handleFormSubmit}>
                    <h3>Login</h3>
                    <div>
                        <label>Email</label>
                        {errors?.errors?.email ? <p style={{color: "red"}}>{errors?.errors.email.message}</p> : null}
                        <input type="email" name="email" value={userInfo.email} onChange={handleFormChange} />
                    </div>
                    <div>
                        <label>Password</label>
                        {errors?.errors?.password ? <p style={{color: "red"}}>{errors?.errors.password.message}</p> : null}
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