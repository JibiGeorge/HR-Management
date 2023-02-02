import React from 'react'
import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import AddModal from './AddModal'

const PageHeader = () => {

    const [showAddModal, setShowAddModal] = useState(false)
    const closeAddModal = () => setShowAddModal(false)

    const openAddModal = () =>{
        setShowAddModal(true)
    }
    return (
        <>
            <div className="pageHeader">
                <div><Toaster position="top-right" reverseOrder={false} /></div>
                <div className="row">
                    <div className="col-sm-9">
                        <h3 className='page-title'>Attendance</h3>
                        <p>Dashboard / Attendance</p>
                    </div>
                    <div className="col-sm-3">
                        <button type="button" class="btn btn-primary add-btn" onClick={openAddModal}>
                            <i className="fa fa-plus"></i>
                            Add Attendance
                        </button>
                    </div>
                </div>
            </div>
            {showAddModal && <AddModal closeModal={closeAddModal}/> }
        </>
    )
}

export default PageHeader