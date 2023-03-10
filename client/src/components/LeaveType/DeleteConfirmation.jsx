import React from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { deleteLeaveType, getAllLeaveTypes } from '../../helper/LeaveTypeHelper';
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
import { setLeaveTypes } from '../../redux/features/leaveTypeSlice';

const DeleteConfirmation = ({ closeModal, id }) => {

    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.alerts);
    const {userDetails} = useSelector(state => state.user);
    const token = userDetails.UserToken;

    const LeaveTypeDelete = async () => {
        dispatch(showLoading())
        try {
            const deleteStatus = await deleteLeaveType(id,token);
            if (deleteStatus.success) {
                const leaveTypes = await getAllLeaveTypes(token);
                dispatch(setLeaveTypes(leaveTypes.allLeaveTypes))
                toast.success(deleteStatus.message, {
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
                closeModal()
                dispatch(hideLoading())
            } else {
                toast.error(deleteStatus.message, {
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
                dispatch(hideLoading())
            }
        } catch (error) {
            toast.error('Something Wrong. Please Check...!', {
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
            dispatch(hideLoading())
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
                                    {loading && <div class="d-flex justify-content-center">
                                        <div class="spinner-border text-primary" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>}
                                    {!loading &&
                                        <>
                                            <div className="col-6">
                                                <button className='btn btn-primary' onClick={LeaveTypeDelete} >Delete</button>
                                            </div>
                                            <div className="col-6">
                                                <button className='btn btn-primary' onClick={closeModal}>Cancel</button>
                                            </div>
                                        </>}
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