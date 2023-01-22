import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { getAllDepartments } from '../../helper/Departmenthelper';
import { addDesignation } from '../../helper/Designationhelper';

function PageHeader() {
    return (
        <div className="pageHeader">
            <div><Toaster position="top-right" reverseOrder={false} /></div>
            <div className="row">
                <div className="col-sm-9">
                    <h3 className='page-title'>Employees</h3>
                    <p>Dashboard / Employees / Employees</p>
                </div>
                <div className="col-sm-3">
                    <Link to='/addEmployee' class="btn btn-primary add-btn">
                        <i className="fa fa-plus"></i>
                        Add Employee
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PageHeader