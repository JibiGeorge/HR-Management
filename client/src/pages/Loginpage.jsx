import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Login from '../components/login/Login'
import { verifyToken } from '../helper/Userhelper';

function Loginpage() {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('usertoken');
      const res = await verifyToken(token);
      if (res.user) {
        navigate('/hr/dashboard');
      } else {
        navigate('/')
      }
    })();
  }, [])

  return (
    <Login />
  )
}

export default Loginpage