import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCartShopping} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import jwtdecode from 'jwt-decode'
import Cookies from 'js-cookie'

const Nav = (props) => {
    const { cookieValue, user, setUser, welcome, setWelcome, loggedIn, setLoggedIn, setCount, count, darkMode, setDarkMode } = props
    const navigate = useNavigate()

    const logout = () => {
        axios.post('http://localhost:8000/api/users/logout', {}, { withCredentials: true })
            .then(res => {
                // console.log(res.data)
                navigate('/')
                setWelcome("Guest")
                setLoggedIn(false)
                setUser()
            })
            .catch(err => console.log(err))
        console.log("logging out")
    }

    const navHome = () => {
        if (loggedIn) {
            navigate("/landing")
            // console.log("logged in so nav to dash")
        } else {
            navigate("/")
            // console.log("logged out so nav to /")
        }
    }

    const navToUser = () => {
        navigate(`/users/${user?._id}`)
        setCount(count+1)
    }
    return (
        <nav>
            <h1>SneakerVerse</h1>
            <div>
            <FontAwesomeIcon icon={faCartShopping} style={{color: "#424242"}} />
            {
                    (welcome !== "Guest") ?
                        // (loggedIn) ?
                        <><button onClick={logout}>Logout</button>&nbsp;&nbsp;</>
                        :
                        <><button onClick={()=>navigate("/register")}>Register/Login</button>&nbsp;&nbsp;</>
                }
            </div>
        </nav>
    )
}

export default Nav