import React from 'react'
import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import AddForm from './AddForm'

const PageHeader = () => {

    const [showAddLeaveTypeModal, setShowAddLeaveTypeModal] = useState(false)
    const closeModal = ()=> setShowAddLeaveTypeModal(false)

    const openAddModal = ()=>{
        setShowAddLeaveTypeModal(true)
    }
    return (
        <>
            <div className="pageHeader">
                <div><Toaster position="top-right" reverseOrder={false} /></div>
                <div className="row">
                    <div className="col-sm-9">
                        <h3 className='page-title'>Leave Type</h3>
                        <p>Dashboard / Leave / Leave Type</p>
                    </div>
                    <div className="col-sm-3">
                        <button type="button" class="btn btn-primary add-btn" onClick={openAddModal}>
                            <i className="fa fa-plus"></i>
                            Add Leave Type
                        </button>
                    </div>
                </div>
            </div>
            {showAddLeaveTypeModal && <AddForm closeModal={closeModal} /> }
        </>
    )
}

export default PageHeader