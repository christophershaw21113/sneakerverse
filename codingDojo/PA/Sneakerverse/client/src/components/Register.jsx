import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'


const Register = () => {
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})
    const [userInfo, setUserInfo] = useState({
        name: "",
        displayName: "",
        email: "",
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
                navigate("/")

            })
            .catch(err => {
                console.log(`reg errer`, err)
                setErrors({
                    name: err.response.data,
                    email: err.response.data,
                    password: err.response.data,
                    confirmPassword: err.response.data,
                })
            })
    }
    return (
        <div style={{marginTop: "100px"}}>
            <form onSubmit={handleFormSubmit}>
                    <h3>Register</h3>
                    <div>
                        <label>Name</label>
                        {errors?.errors?.name ? <p style={{color: "red"}}>{errors?.errors.name.message}</p> : null}
                        <input type="text" name="name" value={userInfo.name} onChange={handleFormChange} />
                    </div>
                    <div>
                        <label>Display Name</label>
                        {errors?.errors?.displayName ? <p style={{color: "red"}}>{errors?.errors.displayName.message}</p> : null}
                        <input type="text" name="displayName" value={userInfo.displayName} onChange={handleFormChange} />
                    </div>
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
                        <label>Confirm Password</label>
                        {errors?.errors?.confirmPassword ? <p style={{color: "red"}}>{errors?.errors.confirmPassword.message}</p> : null}
                        <input type="password" name="confirmPassword" value={userInfo.confirmPassword} onChange={handleFormChange} />
                    </div>
                    <div>
                        <button type="submit">Register</button>
                    </div>
                    <p>Already have an account? <Link to={"/login"}>Login!</Link></p>
                </form>
        </div>
    )
}

export default Register