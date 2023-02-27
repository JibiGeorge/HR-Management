import React from 'react'
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function PageHeader() {    
  const { userDetails } = useSelector(state => state.user);
  const role = userDetails?.role;
    return (
        <div className="pageHeader">
            <div><Toaster position="top-right" reverseOrder={false} /></div>
            <div className="row">
                <div className="col-sm-9">
                    <h3 className='page-title'>Employees</h3>
                    <p>Dashboard / Employees / Employees</p>
                </div>
                {(role === 'Admin' || role === 'HR') &&
                <div className="col-sm-3">
                    <Link to='/hr/addEmployee' class="btn btn-primary add-btn">
                        <i className="fa fa-plus"></i>
                        Add Employee
                    </Link>
                </div>}
            </div>
        </div>
    )
}

export default PageHeader