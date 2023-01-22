import React from 'react'
import Header from '../components/header/Header'
import Sidebar from '../Components/Sidebar/Sidebar'
import Content from '../components/department/Department'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { verifyToken } from '../helper/Userhelper'

function Department() {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('usertoken');
      const res = await verifyToken(token);
      if (res.user) {
        navigate('/department');
      } else {
        navigate('/')
      }
    })();
  }, [])
  return (
    <>
      <Sidebar />
      <Header />
      <Content />
    </>
  )
}

export default Department