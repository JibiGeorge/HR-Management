import { useFormik } from 'formik'
import React from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { addLeaveTypes, getAllLeaveTypes } from '../../helper/LeaveTypeHelper';
import { setLeaveTypes } from '../../redux/features/leaveTypeSlice';

const AddForm = ({ closeModal }) => {

    const dispatch = useDispatch();
    const {userDetails} = useSelector(state => state.user);
    const token = userDetails.UserToken;

    const onSubmit = async () => {
        try {
            const addLeaveType = await addLeaveTypes(values,token)
            if(addLeaveType.success){
                const allLeaveTypes = await getAllLeaveTypes(token)
                dispatch(setLeaveTypes(allLeaveTypes.allLeaveTypes))
                toast.success(addLeaveType.message, {
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
                toast.error(addLeaveType.message, {
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
    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: {
            leaveType: ''
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
                                <h3>Add Leave Type</h3>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-sm-12 mb-2">
                                    <div className="form-group">
                                        <label>Name of the Leave</label>
                                        <input type="text" className='form-control' id='leaveType'
                                            value={values.leaveType} onChange={handleChange} />
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

export default AddForm