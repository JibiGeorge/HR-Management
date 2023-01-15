import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Body from '../components/Dashboard/body'
import Header from '../components/header/Header'
import Sidebar from '../Components/Sidebar/Sidebar'
import { verifyToken } from '../helper/Userhelper'

function Dashboard() {
  const navigate = useNavigate();
  useEffect(()=>{
    (async ()=>{
      const token = localStorage.getItem('usertoken');
      console.log(token);
      const res = await verifyToken(token);
      console.log(res);
      if(res.user){
        console.log("done");
        navigate('/dashboard');
      }else{
        console.log("failed");
        navigate('/')
      }
    })();
  },[])
  return (
    <>
    <Sidebar/>
    <Header/>
    <Body/>
    </>
  )
}

export default Dashboard