import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
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
                    <button type="button" class="btn btn-primary add-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <i className="fa fa-plus"></i>
                        Add Employee
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PageHeader