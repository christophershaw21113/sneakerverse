import './App.css'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect, createContext } from 'react'
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

export const sneakerverseContext = createContext()


function App() {
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
    } else {
      setWelcome("Guest")
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <sneakerverseContext.Provider value={{ brand }}>

        <Nav cookieValue={cookieValue} user={user} setUser={setUser} welcome={welcome} setWelcome={setWelcome} count={count} setCount={setCount} order={order} setBrand={setBrand} />
        {/* <ToastContainer transition={Slide} /> */}
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path='/sneakerverse/adminDashboard' element={<AdminDashboard user={user} count={count} setCount={setCount} />} />
            <Route path='/editProduct/:id' element={<EditProduct cookieValue={cookieValue} />} />
            <Route path='/userDetail' element={<UserDetail user={user} />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/sneakerverse/allshoes" element={<AllSneaks setBrand={setBrand} />} />
          <Route path="/sneakerverse/nike" element={<AllSneaks />} />
          <Route path="/sneakerverse/jordan" element={<AllSneaks />} />
          <Route path="/sneakerverse/adidas" element={<AllSneaks />} />
          <Route path="/sneakerverse/yeezy" element={<AllSneaks />} />
          <Route path="/sneakerverse/newbalance" element={<AllSneaks />} />
          <Route path='/shoes/:id' element={<ProductDetail order={order} setOrder={setOrder} />} />
          <Route path="/sneakerverse/register" element={<Register count={count} setCount={setCount} />} />
          <Route path="/sneakerverse/login" element={<Login count={count} setCount={setCount} />} />
          <Route path="/sneakerverse/cart" element={<Cart order={order} setOrder={setOrder} />} />
          <Route path="/sneakerverse/about" element={<About />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Footer />
      </sneakerverseContext.Provider>
    </div>
  );
}

export default App
