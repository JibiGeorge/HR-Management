import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'

function PageHeader() {
    return (
        <div className="pageHeader">
            <div><Toaster position="top-right" reverseOrder={false} /></div>
            <div className="row">
                <div className="col-sm-9">
                    <h3 className='page-title'>Employees</h3>
                    <p>Dashboard / Employees / Add Employee</p>
                </div>
                <div className="col-sm-3">
                    <Link to='/employee' type="button" class="btn btn-primary add-btn">Employee List</Link>
                </div>
            </div>
        </div>
    )
}

export default PageHeader