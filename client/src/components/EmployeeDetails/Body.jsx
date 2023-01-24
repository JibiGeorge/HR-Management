import React from 'react'
import Header from './Header';
import Profile from './Profile';
import './Style.css'

function Body() {
  return (
    <div class="section-body employee">
      <Header/>
      <Profile/>
    </div>
  )
}

export default Body;