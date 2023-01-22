import React from 'react'
import { useSelector } from 'react-redux'
import './Style.css'

function PageHeader() {

  const { adminDetails } = useSelector(state => state.admin)
  return (
    <div className="pageHeader">
      <div className="row">
        <div className="col-sm-12">
          <h3 className='page-title'>Welcome {adminDetails.username}</h3>
          <p>Dashboard</p>
        </div>
      </div>
    </div>
  )
}

export default PageHeader