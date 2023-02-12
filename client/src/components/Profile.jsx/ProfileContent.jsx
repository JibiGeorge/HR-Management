import React from 'react'
import { useSelector } from 'react-redux';
import Profile from '../EmployeeDetails/Profile';
import Row1 from '../EmployeeDetails/Row1';
import Row2 from '../EmployeeDetails/Row2';
import Row3 from '../EmployeeDetails/Row3';

const ProfileContent = () => {
  const { employeeData } = useSelector(state => state.employees);
  console.log('employee', employeeData);

  return (
    <>
      <div className="section-body employee">
        <Profile profile={employeeData} />
        <Row1 profile={employeeData} />
        <Row2 profile={employeeData} />
        <Row3 profile={employeeData} />
      </div>
    </>
  )
}

export default ProfileContent