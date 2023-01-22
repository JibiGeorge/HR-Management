import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Body from '../components/Dashboard/body'
import Header from '../components/header/Header'
import Sidebar from '../Components/Sidebar/Sidebar'
import { verifyToken } from '../helper/Userhelper'

function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('usertoken');
      const res = await verifyToken(token);
      if (res.user) {
        navigate('/dashboard');
      } else {
        navigate('/')
      }
    })();
  }, [])
  return (
    <>
      <Sidebar />
      <Header />
      <Body />
    </>
  )
}

export default Dashboard