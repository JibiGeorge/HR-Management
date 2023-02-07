import { useFormik } from 'formik'
import React from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { addHoliday, getAllHolidays } from '../../helper/HolidayHelper'
import { setHolidaysDetails } from '../../redux/features/holidaySlice'

const AddHoliday = ({ closeModal }) => {
    const dispatch = useDispatch();
    const {userDetails} = useSelector(state => state.user);
    const token = userDetails.UserToken;

    const onSubmit = async (values)=>{
        try {
            const add = await addHoliday(values,token)
            if(add.success){
                const holidays = await getAllHolidays(token)
                for(let i=0;i<holidays.result.length;i++){
                    holidays.result[i].startDate = new Date(holidays.result[i].startDate).toISOString().slice(0,10)
                }
                for(let i=0;i<holidays.result.length;i++){
                    holidays.result[i].endDate = new Date(holidays.result[i].endDate).toISOString().slice(0,10)
                }
                dispatch(setHolidaysDetails(holidays.result))
                toast.success(add.message, {
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
            }else{
                toast.error(add.message, {
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
            toast.error('Not Added Please Try Again Later', {
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

    const {values, handleChange, handleSubmit} = useFormik({
        initialValues: {
            nameOfTheHoliday: '',
            startDate: '',
            endDate: ''
        },
        onSubmit
    })
    return (
        <>
            <div className="modal-wrapper">
                <div className="modal-container">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="form-header">
                                <h3>Add Holiday</h3>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-sm-12 mb-2">
                                    <div className="form-group">
                                        <label>Name of the Holiday</label>
                                        <input type="text" className='form-control' id='nameOfTheHoliday'
                                        value={values.nameOfTheHoliday} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="col-sm-12 mb-3">
                                    <div className="form-group">
                                        <label>Starting Date</label>
                                        <input type="date" className='form-control' id='startDate'
                                        value={values.startDate} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="col-sm-12 mb-3">
                                    <div className="form-group">
                                        <label>Ending Date</label>
                                        <input type="date" className='form-control' id='endDate'
                                        value={values.endDate} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="modal-btn delete-action">
                                <div className="row">
                                    <div className="col-6">
                                        <button className='btn btn-primary' onClick={handleSubmit}>Save</button>
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

export default AddHoliday