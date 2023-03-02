import React from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDisciplinary, getDisciplinaryData } from '../../helper/Employeehelper';
import { setDisciplinaryData } from '../../redux/features/disciplinarySlice';

const DeleteConfirmation = ({ closeDeleteModal, docID }) => {
    const { userDetails } = useSelector(state => state.user);
    const token = userDetails.UserToken;
    const dispatch = useDispatch();

    const disciplinaryDelete = async () => {
        try {
            const result = await deleteDisciplinary(token, docID);
            if (result.success) {
                const disciplinaryData = await getDisciplinaryData(token);
                dispatch(setDisciplinaryData(disciplinaryData?.data));
                toast.success(result.message, {
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
                closeDeleteModal();
            } else {
                toast.error(result.message, {
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
                closeDeleteModal();
            }
        } catch (error) {
            toast.error('Not Deleted, Please Try Again..!', {
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
            closeDeleteModal()
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
                                        <button className='btn btn-primary' onClick={disciplinaryDelete} >Delete</button>
                                    </div>
                                    <div className="col-6">
                                        <button className='btn btn-primary' onClick={closeDeleteModal}>Cancel</button>
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