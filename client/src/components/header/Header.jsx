import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserDetails } from '../../redux/features/userLogin';
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
    dispatch(setUserDetails({}))
    naviagate('/')
  }

  const updateTime = () => {
    let time = new Date().toLocaleTimeString();
    setTimer(time)
  }
  setInterval(updateTime, 1000)

  return (
    <div className="home-section d-flex justify-content-between">
      <div className="home-content">
        <i className="bx bx-menu" onClick={navbarbtn}></i>
        <span className="text">Drop Down Menu</span>
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