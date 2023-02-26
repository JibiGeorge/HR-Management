import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Login from '../pages/Loginpage'
import instance from '../utils/serverConfig'


const authUser = async () => {
  const token = localStorage.getItem('usertoken')
  const checkToken = await instance({
    url: '/api/verifyToken',
    method: 'post',
    data: { token }
  })
  return checkToken.data.user
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