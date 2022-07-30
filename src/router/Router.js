import { useEffect, useState } from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
import Home from '../pages/Home'
import Login from '../pages/Login'
import Logout from '../pages/Logout'
import Register from '../pages/Register'
import Orders from '../pages/admin/Orders'
import Hotels from '../pages/admin/hotels/Hotels'
import NewHotel from '../pages/admin/hotels/NewHotel'
import Countries from '../pages/admin/Countries'

const Router = () => {
    const [user, setUser] = useState({})

    useEffect(() => {
        const token = localStorage.getItem('token')
        const role = localStorage.getItem('user_role')

        if(token && role) {
            setUser({
                loggedIn: true,
                token,
                role
            })
        }
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                {!user.loggedIn && <Route path="/login" element={<Login />} /> }
                {!user.loggedIn && <Route path="/register" element={<Register />} /> }
                {user.loggedIn && user.role === '0' && (
                    <>
                        <Route path="/admin/orders" element={<Orders />} /> 
                        <Route path="/admin/hotels" element={<Hotels />} /> 
                        <Route path="/admin/hotels/new" element={<NewHotel />} /> 
                        <Route path="/admin/countries" element={<Countries />} /> 
                    </>
                )}
                {user.loggedIn && <Route path="/logout" element={<Logout />} /> }
            </Routes>
        </BrowserRouter>
    )
}

export default Router