import './App.css'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
// import { ToastContainer, Slide } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
import Cookies from 'js-cookie'
import jwtdecode from 'jwt-decode'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Register from './components/Register'
import Login from './components/Login'
import NotFound from './NotFound'
import PrivateRoutes from './components/PrivateRoutes'
import AddProduct from './components/AddProduct'
import Home from './components/Home'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [welcome, setWelcome] = useState()
  const [count, setCount] = useState(0)
  const [user, setUser] = useState()
  const [darkMode, setDarkMode] = useState(false)
  const [cookieValue, setCookieValue] = useState(Cookies.get('userToken'))

  useEffect(() => {
    setCookieValue(Cookies.get('userToken'))
    setCount(count + 1)
    if (Cookies.get('darkMode') === undefined) Cookies.set('darkMode', false.toString(), { expires: 7 })
    if (cookieValue) {
      setWelcome(jwtdecode(cookieValue).name + " (@" + jwtdecode(cookieValue).displayName + ")")
      setUser(jwtdecode(cookieValue))
      setLoggedIn(true)
    } else {
      setWelcome("Guest")
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className={darkMode ? "AppDark" : "AppLight"}>
      <Nav cookieValue={cookieValue} user={user} setUser={setUser} welcome={welcome} setWelcome={setWelcome} loggedIn={loggedIn} setLoggedIn={setLoggedIn} count={count} setCount={setCount} darkMode={darkMode} setDarkMode={setDarkMode} />
      {/* <ToastContainer transition={Slide} /> */}
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path='/addProduct' element={<AddProduct />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register setLoggedIn={setLoggedIn} count={count} setCount={setCount} darkMode={darkMode} />} />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} count={count} setCount={setCount} darkMode={darkMode} />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer darkMode={darkMode} />
    </div>
  );
}

export default App
