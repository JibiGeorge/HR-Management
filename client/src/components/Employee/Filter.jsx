import React from 'react'

function Filter({ employeesDetails, departmentDetails, designationDetails, handelFilterWithID, handleFilterWithName, handleFilterWithDepartment, handleFilterWithDesignation }) {
    return (
        <div className="row filter">
            <span style={{color:'red'}}>Note:- You can filter with anyone of the below filter option..</span>
            <div className="col-sm-6 col-md-3 col-lg-2">
                <div className="form-group form-focus focused">
                    <input type="text" className='form-control floating' onChange={handelFilterWithID} />
                    <label className='focus-label'>Employee ID</label>
                </div>
            </div>
            <div className="col-sm-6 col-md-3 col-lg-2">
                <div className="form-group form-focus focused">
                    <select className='form-control' name="" id="" onChange={handleFilterWithName}>
                        <option value="">Select Employee</option>
                        {employeesDetails ? employeesDetails?.map((values) => (
                            <option value={values._id}>{values.firstName} {values.lastName}</option>
                        )) : ''}
                    </select>
                    <label className='focus-label'>Employee Name</label>
                </div>
            </div>
            <div className="col-sm-6 col-md-3 col-lg-2">
                <div className="form-group form-focus focused">
                    <select className='form-control' name="" id="" onChange={handleFilterWithDepartment}>
                        <option value="">Select Department</option>
                        {departmentDetails ? departmentDetails?.map((values) =>
                            <option value={values?._id}>{values?.department}</option>
                        ) : ''}
                    </select>
                    <label className='focus-label'>Department</label>
                </div>
            </div>
            <div className="col-sm-6 col-md-3 col-lg-2">
                <div className="form-group form-focus focused">
                    <select className='form-control' name="" id="" onChange={handleFilterWithDesignation}>
                        <option value="">Select Designation</option>
                        {designationDetails ? designationDetails?.map((values) => (
                            <option value={values._id}>{values?.designation}</option>
                        )) : ''}
                        <option value="">WELCOME</option>
                        <option value="">TO</option>
                    </select>
                    <label className='focus-label'>Designation</label>
                </div>
            </div>
        </div>
    )
}

export default Filter