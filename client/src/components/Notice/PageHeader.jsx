import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import AddForm from './AddForm';

const PageHeader = () => {
    const [showAddForm, setShowAddForm] = useState(false);
    const closeAddForm = () => setShowAddForm(false);
  return (
    <>
            <div className="pageHeader">
                <div><Toaster position="top-right" reverseOrder={false} /></div>
                <div className="row">
                    <div className="col-sm-9">
                        <h3 className='page-title'>Notice</h3>
                        <p>Dashboard / Notice</p>
                    </div>
                    <div className="col-sm-3">
                        <button type="button" class="btn btn-primary add-btn" onClick={()=> setShowAddForm(true)}>
                            <i className="fa fa-plus"></i>
                            Add Notice
                        </button>
                    </div>
                </div>
            </div>
            {showAddForm && <AddForm closeModal={closeAddForm}/> }
        </>
  )
}

export default PageHeader