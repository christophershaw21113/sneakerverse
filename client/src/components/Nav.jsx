import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import jwtdecode from 'jwt-decode'
import sneakerverse from '../../src/sneakerverse.png'

const Nav = (props) => {
    const { cookieValue, user, welcome, setWelcome, loggedIn, setLoggedIn, setCount, count, order } = props
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
        navigate("/sneakerverse/register")
    }
    const navAdmin = () => {
        navigate("/sneakerverse/adminDashboard")
    }
    const navCart = () => {
        navigate("/sneakerverse/cart")
    }

    // const navToUser = () => {
    //     navigate(`/users/${user?._id}`)
    //     setCount(count + 1)
    // }

    // console.log(jwtdecode(cookieValue))

    return (
        <nav style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div>
                <img src={sneakerverse} onClick={navHome} alt="SneakerVerse" style={{ height: "50px" }} />
                {
                    welcome !== "Guest" ?

                        // <span onClick={() => navToUser()}><h4 style={{paddingTop: '5px'  }}>Welcome, {welcome}</h4></span> :
                        <span ><h4 style={{paddingTop: '5px'  }}>Welcome, {welcome}</h4></span> :
                        <h4 style={{ paddingTop: '5px' }}>Welcome, Guest</h4>
                }
            </div>
            <div>
                <ul className='home-ul'>
                    <Link className='link-styles' to={'/'}><li>Home</li></Link>
                    <Link className='link-styles' to={'/'}><li>About</li></Link>
                    <Link className='link-styles' to={'/sneakerverse/allshoes'}><li>All Sneaks</li></Link>
                    <Link className='link-styles' to={'/'}><li>Nike</li></Link>
                    <Link className='link-styles' to={'/'}><li>Jordan</li></Link>
                    <Link className='link-styles' to={'/'}><li>Adidas</li></Link>
                    <Link className='link-styles' to={'/'}><li>Yeezy</li></Link>
                    <Link className='link-styles' to={'/'}><li>New Balance</li></Link>
                </ul>
            </div>
            <div className='cart-login-btn'>
                <FontAwesomeIcon icon={faCartShopping} style={{ color: "#fff" }} onClick={navCart} /><span>{order.length}</span>&nbsp;&nbsp;
                {
                    (loggedIn) ?
                        <><button className='logout' onClick={logout}>Logout</button>&nbsp;&nbsp;</>
                        :
                        <><button className='reglog' onClick={navRegister}>Register/Login</button>&nbsp;&nbsp;</>
                }
                {
                    (user?.email === "t@w.com" || user?.email === "c@s.com") ?
                        <button className='admin' onClick={navAdmin}>Admin</button> :
                        null
                }
            </div>
        </nav>
    )
}

export default Nav