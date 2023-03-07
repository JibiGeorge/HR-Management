import React from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { employeeDelete, getAllEmployees } from '../../helper/Employeehelper';
import { setEmployeesData } from '../../redux/features/employee';

const DeleteConfirmation = ({ profileID, closeDeleteConfirmation }) => {
    const { userDetails } = useSelector(state => state.user);
    const token = userDetails.UserToken;
    const dispatch = useDispatch();
    const deleteEmployee = async () => {
        try {
            const deleted = await employeeDelete(token, profileID);
            if (deleted.success) {
                const employeeList = await getAllEmployees(token);
                dispatch(setEmployeesData(employeeList.list));
                toast.success(deleted.message, {
                    style: {
                        border: '1px solid #713200',
                        padding: '16px',
                        color: '#25ab11',
                    },
                    iconTheme: {
                        primary: '#25ab11',
                        secondary: '#FFFAEE',
                    },
                });
                closeDeleteConfirmation();
            } else {
                toast.error(deleted.message, {
                    style: {
                        border: '1px solid #713200',
                        padding: '16px',
                        color: '#713200',
                    },
                    iconTheme: {
                        primary: '#713200',
                        secondary: '#FFFAEE',
                    },
                });
            }
        } catch (error) {
            toast.error('Something Went Wrong. Please Check...!', {
                style: {
                    border: '1px solid #713200',
                    padding: '16px',
                    color: '#713200',
                },
                iconTheme: {
                    primary: '#713200',
                    secondary: '#FFFAEE',
                },
            });
        }
    }
    return (
        <>
            <div className="modal-wrapper">
                <div className="modal-container">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="form-header">
                                <h3>Delete Confirmation</h3>
                                <p>Are you Sure want to Delete?</p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="modal-btn delete-action">
                                <div className="row">
                                    <div className="col-6">
                                        <button className='btn btn-primary' onClick={deleteEmployee}>Delete</button>
                                    </div>
                                    <div className="col-6">
                                        <button className='btn btn-primary' onClick={closeDeleteConfirmation}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteConfirmation