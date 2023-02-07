import React from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { deleteAssets, getAssets } from '../../helper/AssetsHelper';
import { deleteHoliday, getAllHolidays } from '../../helper/HolidayHelper';
import { setAssets } from '../../redux/features/assetsSlice';
import { setHolidaysDetails } from '../../redux/features/holidaySlice';

const DeleteConfirmation = ({ closeModal, id }) => {
    const dispatch = useDispatch();
    const {userDetails} = useSelector(state => state.user);
    const token = userDetails.UserToken;

    const HolidayDelete = async () => {
        try {
            const response = await deleteHoliday(id,token)
            if (response.success) {
                const holidays = await getAllHolidays(token)
                for (let i = 0; i < holidays.result.length; i++) {
                    holidays.result[i].startDate = new Date(holidays.result[i].startDate).toISOString().slice(0, 10)
                }
                for (let i = 0; i < holidays.result.length; i++) {
                    holidays.result[i].endDate = new Date(holidays.result[i].endDate).toISOString().slice(0, 10)
                }
                dispatch(setHolidaysDetails(holidays.result))
                toast.success(response.message, {
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
                                        <button className='btn btn-primary' onClick={HolidayDelete} >Delete</button>
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