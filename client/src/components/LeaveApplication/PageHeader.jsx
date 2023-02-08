import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import ApplyLeaveModal from './ApplyLeaveModal';

const PageHeader = ({leaveType}) => {
    const [showApplyLeaveModal, setShowApplyLeaveModal] = useState(false);
    const closeApplyLeaveModal = () => setShowApplyLeaveModal(false);
    return (
        <>
            <div className="pageHeader">
                <div><Toaster position="top-right" reverseOrder={false} /></div>
                <div className="row">
                    <div className="col-sm-9">
                        <h3 className='page-title'>Leave Application</h3>
                        <p>Dashboard / Leave / Leave Application</p>
                    </div>
                    <div className="col-sm-3">
                        <button type="button" class="btn btn-primary add-btn" onClick={()=> setShowApplyLeaveModal(true)}>
                            Apply Leave
                        </button>
                    </div>
                </div>
            </div>
            {showApplyLeaveModal && <ApplyLeaveModal closeModal={closeApplyLeaveModal} leaveTypes={leaveType} /> }
        </>
    )
}

export default PageHeader