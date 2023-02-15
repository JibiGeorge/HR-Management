import React from 'react'

function Filter() {
    return (
        <div className="row filter">
            <div className="col-sm-6 col-md-3 col-lg-2">
                <div className="form-group form-focus focused">
                    <input type="text" className='form-control floating' />
                    <label className='focus-label'>Employee ID</label>
                </div>
            </div>
            <div className="col-sm-6 col-md-3 col-lg-2">
                <div className="form-group form-focus focused">
                <select className='form-control' name="" id="">
                        <option value="">Select Employee</option>
                        <option value="">HI</option>
                        <option value="">WELCOME</option>
                        <option value="">TO</option>
                    </select>
                    <label className='focus-label'>Employee Name</label>
                </div>
            </div>
            <div className="col-sm-6 col-md-3 col-lg-2">
                <div className="form-group form-focus focused">
                    <select className='form-control' name="" id="">
                        <option value="">Select Department</option>
                        <option value="">HI</option>
                        <option value="">WELCOME</option>
                        <option value="">TO</option>
                    </select>
                    <label className='focus-label'>Department</label>
                </div>
            </div>
            <div className="col-sm-6 col-md-3 col-lg-2">
                <div className="form-group form-focus focused">
                    <select className='form-control' name="" id="">
                        <option value="">Select Designation</option>
                        <option value="">HI</option>
                        <option value="">WELCOME</option>
                        <option value="">TO</option>
                    </select>
                    <label className='focus-label'>Designation</label>
                </div>
            </div>
            <div className="col-sm-6 col-md-3 col-lg-2">
                <div className="search-btn">
                    <button className="btn">Search</button>
                </div>
            </div>
        </div>
    )
}

export default Filter