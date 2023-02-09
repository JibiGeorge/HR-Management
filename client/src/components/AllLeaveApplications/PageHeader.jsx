import React from 'react'
import { Toaster } from 'react-hot-toast'

const PageHeader = () => {
    return (
        <>
            <div className="pageHeader">
                <div><Toaster position="top-right" reverseOrder={false} /></div>
                <div className="row">
                    <div className="col-sm-9">
                        <h3 className='page-title'>Leave Applications</h3>
                        <p>Dashboard / leave / All Leave Applications</p>
                    </div>
                    <div className="col-sm-3">
                        <button type="button" class="btn btn-primary add-btn">Apply leave</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PageHeader