import React from 'react'
import { Toaster } from 'react-hot-toast'

const PageHeader = () => {
    return (
        <>
            <div className="pageHeader">
                <div><Toaster position="top-right" reverseOrder={false} /></div>
                <div className="row">
                    <div className="col-sm-9">
                        <h3 className='page-title'>Payrol</h3>
                        <p>Payrol / Payrol</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PageHeader