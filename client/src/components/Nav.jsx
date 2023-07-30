import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import jwtdecode from 'jwt-decode'
import sneakerverse from '../../src/sneakerverse.png'
import { useMediaQuery } from 'react-responsive';
import nike from '../Logos/Nike.svg'
import adidas from '../Logos/Adidas.svg'
import aj from '../Logos/AJ.png'
import yzy from '../Logos/YZY.png'
import nb from '../Logos/NB.svg'


const Nav = (props) => {
    const { cookieValue, user, welcome, setWelcome, loggedIn, setLoggedIn, setCount, count, order, setBrand } = props
    const navigate = useNavigate()
    const isSmallScreen = useMediaQuery({ maxWidth: 775 })
    const isMedScreen = useMediaQuery({ maxWidth: 975 })
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const mobileBrand = (brand) => {
        setBrand(brand)
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }
    // const navToUser = () => {
    //     navigate(`/users/${user?._id}`)
    //     setCount(count + 1)
    // }

    // console.log(jwtdecode(cookieValue))

    return (
        <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div id="logo">
                <img src={sneakerverse} onClick={navHome} alt="SneakerVerse" style={{ height: "50px" }} />
                {
                    welcome !== "Guest" ?
                        // <span onClick={() => navToUser()}><h4 style={{paddingTop: '5px'  }}>Welcome, {welcome}</h4></span> :
                        <span ><h4 style={{ paddingTop: '5px' }}>Welcome, {welcome}</h4></span> :
                        <h4 style={{ paddingTop: '5px' }}>Welcome, Guest</h4>
                }
            </div>
            <div id="links" style={isSmallScreen & !isMobileMenuOpen? { display: "none" } : { display: "block" }}>
                <ul className={isSmallScreen & isMobileMenuOpen ? 'mobile-ul' : 'home-ul'} >
                    <Link className='link-styles' to={'/'}><li>Home</li></Link>
                    <Link className='link-styles' to={'/sneakerverse/allshoes'} onClick={() => mobileBrand("")}><li>All</li></Link>
                    <Link className='link-styles' to={'/sneakerverse/nike'} onClick={() => mobileBrand("nike")}><li>{!isMedScreen ? "Nike" : <img src={nike} alt='nike logo' style={{width: '25px'}}/>}</li></Link>
                    <Link className='link-styles' to={'/sneakerverse/jordan'} onClick={() => mobileBrand("jordan")}><li>{!isMedScreen ? "Jordan" : <img src={aj} alt='jordan logo' style={{width: '25px'}}/>}</li></Link>
                    <Link className='link-styles' to={'/sneakerverse/adidas'} onClick={() => mobileBrand("adidas")}><li>{!isMedScreen ? "Adidas" : <img src={adidas} alt='adidas logo' style={{width: '25px'}}/>}</li></Link>
                    <Link className='link-styles' to={'/sneakerverse/yeezy'} onClick={() => mobileBrand("yeezy")}><li>{!isMedScreen ? "Yeezy" : <img src={yzy} alt='yzy logo' style={{width: '25px'}}/>}</li></Link>
                    <Link className='link-styles' to={'/sneakerverse/newbalance'} onClick={() => mobileBrand("new balance")}><li>{!isMedScreen ? "New Balance" : <img src={nb} alt='nb logo' style={{width: '25px'}}/>}</li></Link>
                    <Link className='link-styles' to={'/sneakerverse/about'}><li>About</li></Link>
                </ul>
            </div>
            <div id="hamburger" className={isSmallScreen ? 'home-ul' : 'hidden'}>
                {isMobileMenuOpen ? <FontAwesomeIcon icon={faXmark} style={{ color: "#fff" }} onClick={toggleMobileMenu} /> : <FontAwesomeIcon icon={faBars} style={{ color: "#fff" }} onClick={toggleMobileMenu} />}
            </div>
            <div id="cart" className='cart-login-btn'>
                <div><FontAwesomeIcon icon={faCartShopping} style={{ color: "#fff" }} onClick={navCart} /><span>{order.length}</span>&nbsp;&nbsp;</div>
                {
                    (loggedIn) ?
                        <button className='logout' onClick={logout}>Logout</button>
                        :
                        <button className='reglog' onClick={navRegister}>Sign Up/Login</button>
                }
                {
                    (user?.email === "t@w.com" || user?.email === "c@s.com") ?
                        <><span className='MQHide'>&nbsp;</span><button className='admin' onClick={navAdmin}>Admin</button></> :
                        null
                }
            </div>
        </nav>
    )
}

export default Nav