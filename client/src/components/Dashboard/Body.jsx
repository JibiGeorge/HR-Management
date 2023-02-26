import React from 'react'
import { useSelector } from 'react-redux'
import Attendance from './Attendance'
import Cards from './Cards'
import PageHeader from './PageHeader'

function Body() {
  const { userDetails } = useSelector(state => state.user);
  const role = userDetails?.role;
  const token = userDetails.UserToken;
  return (
    <div className="section-body">
      <PageHeader />
      
      {role === 'Admin' &&
      <Cards token={token} />}
      
      {(role === 'Employee' || role=== 'HR') &&
        <Attendance token={token} />
      }
    </div>
  )
}

export default Body