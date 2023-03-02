import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import AddDisciplinaryModal from './AddDisciplinaryModal';

const PageHeader = () => {
  const [addDisciplinaryModal, setAddDisciplinaryModal] = useState(false);
  const closeAddDisciplinaryModal = () => setAddDisciplinaryModal(false);
  return (
    <>
      <div className="pageHeader">
        <div><Toaster position="top-right" reverseOrder={false} /></div>
        <div className="row">
          <div className="col-sm-9">
            <h3 className='page-title'>Disciplinary</h3>
            <p>Dashboard / Employee / Disciplinary</p>
          </div>
          <div className="col-sm-3">
            <button type="button" class="btn btn-primary add-btn" onClick={()=>setAddDisciplinaryModal(true)}>
              <i className="fa fa-plus"></i>Add Disciplinary</button>
          </div>
        </div>
      </div>
      {addDisciplinaryModal && <AddDisciplinaryModal closeAddDisciplinaryModal={closeAddDisciplinaryModal}/>}
    </>
  )
}

export default PageHeader