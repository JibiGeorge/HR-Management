import React from 'react'
import { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div className="pageHeader">
            <div><Toaster position="top-right" reverseOrder={false} /></div>
            <div className="row">
                <div className="col-sm-9">
                    <h3 className='page-title'>Employees</h3>
                    <p>Dashboard / Employees / Profile</p>
                </div>
            </div>
        </div>
    )
}

export default Header