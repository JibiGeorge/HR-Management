import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast';
import AddDesignation from './AddDesignation';

function PageHeader() {

  const [addDesignationModal, setAddDesignationModal] = useState(false);
  const closeAddDesignationModal = () => setAddDesignationModal(false);

  return (
    <>
      <div className="pageHeader">
        <div><Toaster position="top-right" reverseOrder={false} /></div>
        <div className="row">
          <div className="col-sm-9">
            <h3 className='page-title'>Designation</h3>
            <p>Dashboard / Organization / Designation</p>
          </div>
          <div className="col-sm-3">
            <button type="button" class="btn btn-primary add-btn" onClick={() => setAddDesignationModal(true)} >
              <i className="fa fa-plus"></i>
              Add Designation
            </button>
          </div>
        </div>
      </div>
      {addDesignationModal && <AddDesignation closeAddDesignationModal={closeAddDesignationModal} />}
    </>
  )
}

export default PageHeader