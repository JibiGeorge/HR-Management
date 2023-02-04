import React from 'react'
import Row2 from './Row2';
import Header from './Header';
import Profile from './Profile';
import Row1 from './Row1';
import './Style.css'
import Row3 from './Row3';
import { useSelector } from 'react-redux';

function Body() {
  const {employeeData} =  useSelector(state => state.employees);
  return (
    <div className="section-body employee">
      <Header/>
      <Profile profile={employeeData}/>
      <Row1 profile={employeeData}/>
      <Row2 profile={employeeData}/>
      <Row3/>
    </div>
  )
}

export default Body;