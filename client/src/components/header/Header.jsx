import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserDetails } from '../../redux/features/userLogin';
import './Header.css'

function Header() {

  const dispatch = useDispatch();
  const naviagate = useNavigate();
  const { companyProfileData } = useSelector(state => state.companyProfile);
  const [timer, setTimer] = useState('')

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

  const updateTime = (timeZone) => {
    console.log(timeZone);
    const date = new Date();
    const options = { timeZone: timeZone, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
    setTimer(date.toLocaleString('en-US', options));
  }
  setInterval(()=>updateTime(companyProfileData.timeZone), 1000)

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