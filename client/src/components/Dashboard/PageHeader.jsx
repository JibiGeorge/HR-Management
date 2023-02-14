import React from 'react'
import { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import './Style.css'

function PageHeader() {

  const { userDetails } = useSelector(state => state.user)
  return (
    <div className="pageHeader">
      <div><Toaster position="top-right" reverseOrder={false} /></div>
      <div className="row">
        <div className="col-sm-12">
          <h3 className='page-title'>Welcome {userDetails.username}</h3>
          <p>Dashboard</p>
        </div>
      </div>
    </div>
  )
}

export default PageHeader