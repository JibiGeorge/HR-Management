import React from 'react'
import Row2 from './Row2';
import Header from './Header';
import Profile from './Profile';
import Row1 from './Row1';
import './Style.css'
import Row3 from './Row3';
import Row4 from './Row4';

function Body() {
  return (
    <div className="section-body employee">
      <Header />
      <Profile />
      <Row1 />
      <Row2 />
      <Row3 />
      <Row4 />
    </div>
  )
}

export default Body;