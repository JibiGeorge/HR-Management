import React from 'react'

function Filter() {
    return (
        <div className="row">
            <div className="col-sm-6 col-md-3">
                <div className="form-group form-focus">
                    <input type="text" className='form-control floating' />
                    <label className='focus-label'>Employee ID</label>
                </div>
            </div>
            <div className="col-sm-6 col-md-3">
                <div className="form-group form-focus">
                    <input type="text" className='form-control floating' />
                    <label className='focus-label'>Employee Name</label>
                </div>
            </div>
            <div className="col-sm-6 col-md-3"></div>
        </div>
    )
}

export default Filter