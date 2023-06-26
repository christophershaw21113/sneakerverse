import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import jwtdecode from 'jwt-decode'
import sneakerverse from '../../src/sneakerverse.png'

const Nav = (props) => {
    const { cookieValue, user, setUser, welcome, setWelcome, loggedIn, setLoggedIn, setCount, count, darkMode, setDarkMode } = props
    const navigate = useNavigate()

    useEffect(() => {
        if (cookieValue) {
            // console.log(jwtdecode(cookieValue))
            setWelcome(jwtdecode(cookieValue).firstName)
        }
        // eslint-disable-next-line
    }, [count])

    const logout = () => {
        axios.post('http://localhost:8000/api/users/logout', {}, { withCredentials: true })
            .then(res => {
                // console.log(res.data)
                navigate('/')
                setWelcome("Guest")
                setLoggedIn(false)
                setCount(count + 1)
                window.location.reload()
            })
            .catch(err => console.log(err))
        console.log("logging out")
    }

    const navHome = () => {
        navigate("/")
    }

    const navRegister = () => {
        navigate("/register")
    }
    const navAdmin = () => {
        navigate("/adminDashboard")
    }
    const navCart = () => {
        navigate("/cart")
    }

    const navToUser = () => {
        navigate(`/users/${user?._id}`)
        setCount(count + 1)
    }

    // console.log(jwtdecode(cookieValue))

    return (
        <nav>
            <div>
                <img src={sneakerverse} onClick={navHome} alt="SneakerVerse" style={{height:"50px"}}/>
                {
                    welcome !== "Guest" ?
                        <span onClick={() => navToUser()}><h4 style={{ display: 'inline' }}>Welcome, {welcome}</h4></span> :
                        <h4 style={{ display: 'inline' }}>Welcome, Guest</h4>
                }
            </div>
            <div>
                <FontAwesomeIcon icon={faCartShopping} style={{ color: "#424242" }} onClick={navCart} />
                {
                    (loggedIn) ?
                        <><button onClick={logout}>Logout</button>&nbsp;&nbsp;</>
                        :
                        <><button onClick={navRegister}>Register/Login</button>&nbsp;&nbsp;</>
                }
                {
                    (user?.email === "t@w.com" || user?.email === "c@s.com") ?
                        <button onClick={navAdmin}>Admin</button> :
                        null
                }
            </div>
        </nav>
    )
}

export default Nav