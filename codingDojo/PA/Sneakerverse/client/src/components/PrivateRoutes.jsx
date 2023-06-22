import { Navigate, Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'

const PrivateRoutes = () => {
    const cookieValue = Cookies.get('userToken')

    let isAuthenticated

    if (cookieValue) {
        isAuthenticated = true
        console.log(isAuthenticated)
    } else {
        isAuthenticated = false
        console.log(isAuthenticated)
    }    return (
        isAuthenticated ? <Outlet /> : <Navigate to='/login' />
    )
}

export default PrivateRoutes