import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Login from '../pages/Loginpage'


const authUser = () => {
    const user = localStorage.getItem('usertoken')
    return user
}
const Protect = () => {
    const isAuth = authUser();
    return isAuth ? (
        <Outlet />
      ) : (
        <Navigate to="/" replace />
      );
}

export default Protect