import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'


const Register = () => {
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
                navigate("/")

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
        <div style={{marginTop: "100px"}}>
            <form onSubmit={handleFormSubmit}>
                    <h3>Register</h3>
                    <div>
                        <label>First Name</label>
                        {errors?.firstName ? <p style={{color: "red"}}>{errors?.firstName.message}</p> : null}
                        <input type="text" name="firstName" value={userInfo.firstName} onChange={handleFormChange} />
                    </div>
                    <div>
                        <label>Last Name</label>
                        {errors?.lastName ? <p style={{color: "red"}}>{errors?.lastName.message}</p> : null}
                        <input type="text" name="lastName" value={userInfo.lastName} onChange={handleFormChange} />
                    </div>
                    <div>
                        <label>Email</label>
                        {errors?.email ? <p style={{color: "red"}}>{errors?.email.message}</p> : null}
                        <input type="email" name="email" value={userInfo.email} onChange={handleFormChange} />
                    </div>
                    <div>
                        <label>Phone Number</label>
                        {errors?.phoneNumber ? <p style={{color: "red"}}>{errors?.phoneNumber.message}</p> : null}
                        <input type="email" name="email" value={userInfo.phoneNumber} onChange={handleFormChange} />
                    </div>
                    <div>
                        <label>Password</label>
                        {errors?.password ? <p style={{color: "red"}}>{errors?.password.message}</p> : null}
                        <input type="password" name="password" value={userInfo.password} onChange={handleFormChange} />
                    </div>
                    <div>
                        <label>Confirm Password</label>
                        {errors?.confirmPassword ? <p style={{color: "red"}}>{errors?.confirmPassword.message}</p> : null}
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