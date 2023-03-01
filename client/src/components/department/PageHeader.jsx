import React, { useState } from 'react'
import './Style.css'
import { Toaster } from 'react-hot-toast';
import AddDepartment from './AddDepartment';

function PageHeader() {
  const [showAddDepartmentModal, setShowDepartmentModal] = useState(false);
  const closeAddDepartmentModal = () => setShowDepartmentModal(false)

  return (
    <>
    <div className="pageHeader">
      <div><Toaster position="top-right" reverseOrder={false} /></div>
      <div className="row">
        <div className="col-sm-9">
          <h3 className='page-title'>Department</h3>
          <p>Dashboard / Organization / Department</p>
        </div>
        <div className="col-sm-3">
          <button type="button" class="btn btn-primary add-btn" onClick={()=>setShowDepartmentModal(true)}>
            <i className="fa fa-plus"></i>
            Add Department
          </button>
        </div>
      </div>      
    </div>
    {showAddDepartmentModal && <AddDepartment closeAddDepartmentModal={closeAddDepartmentModal} />}
    </>
  )
}

export default PageHeader