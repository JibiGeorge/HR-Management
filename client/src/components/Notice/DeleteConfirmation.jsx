import React from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNotice, getAllNotices } from '../../helper/NoticeHelper';
import { setAllNotices } from '../../redux/features/noticeSlice';

const DeleteConfirmation = ({closeModal,noticeId}) => {
    const dispatch = useDispatch();
    const { userDetails } = useSelector(state => state.user);
    let token = userDetails.UserToken;

    const noticeDelete = async()=>{
        try {
            const deleteStatus = await deleteNotice(token, noticeId);
            if(deleteStatus.success){
                const AllNotices = await getAllNotices(token);
                if (AllNotices.success) {
                    dispatch(setAllNotices(AllNotices.data));
                } 
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
                closeModal();
            }else{
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
            }
        } catch (error) {
            toast.error('Something went Wrong', {
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
                                        <button className='btn btn-primary' onClick={noticeDelete} >Delete</button>
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