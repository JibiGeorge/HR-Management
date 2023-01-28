import React from 'react'
import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import AddAssets from './AddAssets'

const PageHeader = () => {

    const [showModal, setShowModal] = useState(false)
    const closeModal = () => setShowModal(false)

    const handlePopupAddAssets = () => {
        setShowModal(true)
    }
    return (
        <>
            <div className="pageHeader">
                <div><Toaster position="top-right" reverseOrder={false} /></div>
                <div className="row">
                    <div className="col-sm-9">
                        <h3 className='page-title'>Assets</h3>
                        <p>Dashboard / Assets / Assets</p>
                    </div>
                    <div className="col-sm-3">
                        <button type="button" class="btn btn-primary add-btn"
                            onClick={handlePopupAddAssets}>
                            <i className="fa fa-plus"></i>Add Assets</button>
                    </div>
                </div>
            </div>

            {showModal && <AddAssets closeModal={closeModal}/>}
        </>
    )
}

export default PageHeader