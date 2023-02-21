import React from 'react'
import { Toaster } from 'react-hot-toast'

const PageHeader = () => {
    return (
        <div className="pageHeader">
            <div><Toaster position="top-right" reverseOrder={false} /></div>
            <div className="row">
                <div className="col-sm-9">
                    <h3 className='page-title'>Settings</h3>
                    <p>Settings</p>
                </div>
            </div>
        </div>
    )
}

export default PageHeader