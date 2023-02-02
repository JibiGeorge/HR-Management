import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAdminDetails } from '../../redux/features/adminLogin';
import './Header.css'

function Header() {

  const dispatch = useDispatch();
  const naviagate = useNavigate();
  let time = new Date().toLocaleTimeString();
  const [timer, setTimer] = useState(time)

  const navbarbtn = () => {
    let sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle("close");
  }

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('usertoken');
    dispatch(setAdminDetails({}))
    naviagate('/')
  }

  const updateTime = () => {
    let time = new Date().toLocaleTimeString();
    setTimer(time)
  }
  setInterval(updateTime, 1000)

  return (
    <div class="home-section d-flex justify-content-between">
      <div class="home-content">
        <i class="bx bx-menu" onClick={navbarbtn}></i>
        <span class="text">Drop Down Menu</span>
      </div>
      <div className='d-flex home-content'>
        <div className="timer">
          <span className='text'>{timer}</span>
        </div>
        <div className="logout-btn">
          <button className='btn btn-primary' onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default Header