import React from 'react'
import { useNavigate } from 'react-router-dom'


const AdminDashboard = () => {
    const navigate = useNavigate()

    return (
        <div style={{marginTop: "100px"}}>
            <div className="addProduct">
                <button onClick={()=>navigate("/addProducts")}>Add a sneaker</button>
                <button onClick={()=>navigate("/viewProducts")}>View all sneakers</button>

            </div>
        </div>
    )
}

export default AdminDashboard