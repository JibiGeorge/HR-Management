import React from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { attendanceList, deletAttendance } from '../../helper/AttendanceHelper'
import { setAllAttendance } from '../../redux/features/attendanceSlice'

const DeleteConfirmation = ({ closeModal, id,empID }) => {
    const { userDetails } = useSelector(state => state.user);
    const token = userDetails.UserToken;
    const dispatch = useDispatch()
    const attendanceDelete = async () => {
        try {
            const deleteModal = await deletAttendance(id, token,empID)
            if (deleteModal.success) {
                const attendanceData = await attendanceList(token)
                dispatch(setAllAttendance(attendanceData.data))
                toast.success(deleteModal.message, {
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
            } else {
                toast.error(deleteModal.message, {
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
                                        <button className='btn btn-primary' onClick={attendanceDelete}>Delete</button>
                                    </div>
                                    <div className="col-6">
                                        <button className='btn btn-primary' onClick={closeModal}>Cancel</button>
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