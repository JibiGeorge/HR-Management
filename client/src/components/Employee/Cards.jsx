import React from 'react'
import { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

function Cards({ employeesDetails, role }) {
    return (
        <>
            <div className="row">
                {employeesDetails ? employeesDetails.map(values => {
                    return (
                        <div className="col-md-4 col-sm-6 col-lg-4 col-xl-3">
                            <div className="profile-widget">
                                <div className="profile-img">
                                    <div className='avatar'>
                                        <img src={values.image} alt="" />
                                    </div>
                                </div>
                                <h4 className="user-name mt-10 mb-0 text-ellipsis">
                                    {(role === 'Admin' || role === 'HR') &&
                                        <Link to='/hr/employeeDetails' state={{ id: values._id }}>{values.firstName} {values.lastName}</Link>
                                    }
                                    {role === 'Employee' &&
                                        <p >{values.firstName} {values.lastName}</p>

                                    }
                                </h4>
                                <div className="small text-muted">{values.empCode}</div>
                            </div>
                        </div>
                    )
                }) : (''
                )}
            </div>
        </>
    )
}

export default Cards