import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import jwtdecode from 'jwt-decode'

const Nav = (props) => {
    const { cookieValue, user, setUser, welcome, setWelcome, loggedIn, setLoggedIn, setCount, count, darkMode, setDarkMode } = props
    const navigate = useNavigate()

    useEffect(() => {
        if (cookieValue) {
            // console.log(jwtdecode(cookieValue))
            setWelcome(jwtdecode(cookieValue).name + " (@" + jwtdecode(cookieValue).displayName + ")")
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

    // const navToUser = () => {
    //     navigate(`/users/${user?._id}`)
    //     setCount(count + 1)
    // }

    // console.log(jwtdecode(cookieValue))

    // Nav CSS, inline for now but will add to external stylesheet later
    const navBarStyle = {
        backgroundColor: '#808080',
        color: 'white',
        fontSize: '1.3rem',
        textDecoration: 'none',
        marginBottom: '1.5rem',
        transition: 'all 0.3s',
        '&:visited': {
            color: 'white',
            backgroundColor: '#808080',
        }
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <nav style={navBarStyle}>
            <h1 onClick={navHome}>SneakerVerse</h1>
            <ul style={{listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: '9999'}}>
                <li style={{marginRight: '10px'}}>Home</li>
                <li style={{marginRight: '10px'}}>Nike</li>
                <li style={{marginRight: '10px'}}>Jordan</li>
                <li style={{marginRight: '10px'}}>Adidas</li>
                <li style={{marginRight: '10px'}}>Yeezy</li>
            </ul>
            <div>
                <FontAwesomeIcon icon={faCartShopping} style={{ color: "#424242" }} onClick={navCart}/>
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
        </div>
    )
}

export default Nav