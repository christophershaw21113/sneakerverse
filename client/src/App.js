import './App.css'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import jwtdecode from 'jwt-decode'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Register from './components/Register'
import Login from './components/Login'
import NotFound from './components/NotFound'
import PrivateRoutes from './components/PrivateRoutes'
import Home from './components/Home'
import AdminDashboard from './components/AdminDashboard'
import Cart from './components/Cart'
import EditProduct from './components/EditProduct'
import ProductDetail from './components/ProductDetail'
import UserDetail from './components/UserDetail'
import AllSneaks from './components/AllSneaks'
import About from './components/About'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [welcome, setWelcome] = useState()
  const [count, setCount] = useState(0)
  const [user, setUser] = useState()
  const [cookieValue, setCookieValue] = useState(Cookies.get('userToken'))
  const [order, setOrder] = useState([])
  const [brand, setBrand] = useState("")

  useEffect(() => {
    setCookieValue(Cookies.get('userToken'))
    setCount(count + 1)
    if (cookieValue) {
      setWelcome(user?.firstName)
      setUser(jwtdecode(cookieValue))
      setLoggedIn(true)
    } else {
      setWelcome("Guest")
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <Nav cookieValue={cookieValue} user={user} setUser={setUser} welcome={welcome} setWelcome={setWelcome} loggedIn={loggedIn} setLoggedIn={setLoggedIn} count={count} setCount={setCount} order={order} setBrand={setBrand} brand={brand} />
      {/* <ToastContainer transition={Slide} /> */}
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path='/sneakerverse/adminDashboard' element={<AdminDashboard user={user} count={count} setCount={setCount} />} />
          <Route path='/editProduct/:id' element={<EditProduct cookieValue={cookieValue} />} />
          <Route path='/userDetail' element={<UserDetail user={user} />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/sneakerverse/allshoes" element={<AllSneaks brand={brand} />} />
        <Route path="/sneakerverse/nike" element={<AllSneaks brand={brand} />} />
        <Route path="/sneakerverse/jordan" element={<AllSneaks brand={brand} />} />
        <Route path="/sneakerverse/adidas" element={<AllSneaks brand={brand} />} />
        <Route path="/sneakerverse/yeezy" element={<AllSneaks brand={brand} />} />
        <Route path="/sneakerverse/newbalance" element={<AllSneaks brand={brand} />} />
        <Route path='/shoes/:id' element={<ProductDetail order={order} setOrder={setOrder} />} />
        <Route path="/sneakerverse/register" element={<Register setLoggedIn={setLoggedIn} count={count} setCount={setCount} />} />
        <Route path="/sneakerverse/login" element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} count={count} setCount={setCount} />} />
        <Route path="/sneakerverse/cart" element={<Cart order={order} setOrder={setOrder} />} />
        <Route path="/sneakerverse/about" element={<About />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App
