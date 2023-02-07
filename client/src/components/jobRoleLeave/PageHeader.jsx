import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import AddLeavesModal from './AddLeavesModal'

const PageHeader = () => {
    const [showLeaveModal, setShowLeaveModal] = useState(false)
    const closeLeveModal = () => setShowLeaveModal(false)
    return (
        <>
            <div className="pageHeader">
                <div><Toaster position="top-right" reverseOrder={false} /></div>
                <div className="row">
                    <div className="col-sm-9">
                        <h3 className='page-title'>Job Role Leave</h3>
                        <p>Dashboard / Leave / Job Role Leave</p>
                    </div>
                    <div className="col-sm-3">
                        <button type="button" class="btn btn-primary add-btn" onClick={() => setShowLeaveModal(true)}>
                            <i className="fa fa-plus"></i>
                            Add Leaves
                        </button>
                    </div>
                </div>
            </div>
            {showLeaveModal && <AddLeavesModal closeModal={closeLeveModal}/>}
        </>
    )
}

export default PageHeader