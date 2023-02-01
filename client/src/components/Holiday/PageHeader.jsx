import React from 'react'
import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import AddHoliday from './AddHoliday'

const PageHeader = () => {

    const [addHolidayModal, setHolidayModal] = useState(false)
    const closeAddModal = () => setHolidayModal(false)

    const addHoliday = () => {
        setHolidayModal(true)
    }
    return (
        <>
            <div className="pageHeader">
                <div><Toaster position="top-right" reverseOrder={false} /></div>
                <div className="row">
                    <div className="col-sm-9">
                        <h3 className='page-title'>Holiday</h3>
                        <p>Dashboard / Leave / Holiday</p>
                    </div>
                    <div className="col-sm-3">
                        <button type="button" class="btn btn-primary add-btn" onClick={addHoliday}>
                            <i className="fa fa-plus"></i>
                            Add Holiday
                        </button>
                    </div>
                </div>
            </div>
            {addHolidayModal && <AddHoliday closeModal={closeAddModal}/> }
        </>
    )
}

export default PageHeader