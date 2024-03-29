import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import sneakerverseBK from '../../src/sneakerverseBK.png'
import LS from '../Images/RegLog/leon-skibitzki-NMyuo1hoCAA-unsplash.jpg'
import { useMediaQuery } from 'react-responsive';

const Login = (props) => {
  const { count, setCount } = props
  const navigate = useNavigate()
  const isSmallScreen = useMediaQuery({ maxWidth: 768 })
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
    <div style={{ marginTop: "170px", marginBottom: "120px", display: 'flex', justifyContent: 'center', width: '800px'}}>
      {
        !isSmallScreen ?
          <div style={{ display: 'flex' }}>
            <img src={LS} alt='' width='100%' style={{ marginTop: 0 }} />
          </div>
          : null
      }
      <form className='login-form' onSubmit={handleFormSubmit} style={{ padding: '10px 100px' }}>
        <img src={sneakerverseBK} alt="SneakerVerse" style={{ height: "70px", display: 'flex', marginTop: '10px' }} />
        <h2 style={{ width: '100%', textAlign: 'center', marginTop: '20px', whiteSpace: 'nowrap' }}>Login to Your Account</h2>
        <p style={{ fontVariant: 'small-caps', textAlign: 'center', color: 'grey' }}>the sneaks are waiting</p>
        {errors?.logErr ? <p style={{ color: "red" }}>{errors.logErr}</p> : null}
        <div>
          <input type="email" name="email" value={userInfo.email} placeholder='Email Address' onChange={handleFormChange} style={{ width: '100%' }} />
        </div>
        <div>
          <input type="password" name="password" value={userInfo.password} placeholder='Password' onChange={handleFormChange} style={{ width: '100%' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '10px' }}>
          <button className='sign-in-btn' type="submit">Sign In</button>
        </div>
        <p style={{ textAlign: 'center', color: 'grey' }}>Need an account? <Link style={{ color: '#198754' }} to={"/sneakerverse/register"}>Register!</Link></p>
      </form>
    </div>
  );
}

export default Login