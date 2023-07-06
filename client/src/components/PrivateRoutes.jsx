import { Navigate, Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'
import jwtdecode from 'jwt-decode'

const PrivateRoutes = () => {
    const cookieValue = Cookies.get('userToken')

    let isAuthenticated

    if (jwtdecode(cookieValue).email === "t@w.com" || jwtdecode(cookieValue).email === "c@s.com") {
        isAuthenticated = true
        // console.log(isAuthenticated)
    } else {
        isAuthenticated = false
        // console.log(isAuthenticated)
    }
    return (
        isAuthenticated ? <Outlet /> : <Navigate to='/login' />
    )
}

export default PrivateRoutes