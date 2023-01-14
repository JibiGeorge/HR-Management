import React from 'react'
import './Header.css'

function Header() {

    const navbarbtn = ()=>{
        let sidebar= document.querySelector('.sidebar');
        sidebar.classList.toggle("close");
    }
  return (
    <div class="home-section">
        <div class="home-content">
            <i class="bx bx-menu" onClick={navbarbtn}></i>
            <span class="text">Drop Down Menu</span>
        </div>
    </div>
  )
}

export default Header