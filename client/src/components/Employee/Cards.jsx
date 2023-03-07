import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import DeleteConfirmation from './DeleteConfirmation';

function Cards({ employeesDetails, role }) {
    const [profileID, setProfileID] = useState('');
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [cardActionShow, setCardActionShow] = useState(null);
    const employeeDelete = (id) => {
        setProfileID(id);
        setDeleteConfirmation(true);
        setCardActionShow(null)
    }
    const closeDeleteConfirmation = () => setDeleteConfirmation(false);
    return (
        <>
            <div className="row">
                {employeesDetails ? employeesDetails?.map((values) => {
                    return (
                        <div className="col-md-4 col-sm-6 col-lg-4 col-xl-3">
                            <div className="profile-widget">
                                <div className="profile-img">
                                    <div className='avatar'>
                                        <img src={values.image} alt="" />
                                    </div>
                                </div>
                                <div className="dropdown profile-action">
                                    <span className='action-icon' onClick={() => setCardActionShow(values._id)}>
                                        <i class="las la-braille"></i>
                                    </span>
                                    {cardActionShow === values._id &&
                                        <div className="dropdown-menu">
                                            <button className='dropdown-item' onClick={() => employeeDelete(values._id)}>
                                                <i class="las la-trash me-2"></i>Delete
                                            </button>
                                        </div>}
                                </div>
                                <h4 className="user-name mt-10 mb-0 text-ellipsis">
                                    {(role === 'Admin' || role === 'HR') &&
                                        <Link to='/hr/employeeDetails' state={{ id: values._id }}>{values?.firstName} {values?.lastName}</Link>
                                    }
                                    {role === 'Employee' &&
                                        <p >{values?.firstName} {values?.lastName}</p>

                                    }
                                </h4>
                                <div className="small text-muted">{values?.empCode}</div>
                            </div>
                        </div>
                    )
                }) : (''
                )}
            </div>

            {deleteConfirmation && <DeleteConfirmation profileID={profileID} closeDeleteConfirmation={closeDeleteConfirmation} />}
        </>
    )
}

export default Cards