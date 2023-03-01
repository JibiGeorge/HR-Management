import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { addDepartment, getAllDepartments } from '../../helper/Departmenthelper';
import { setDepartmentData } from '../../redux/features/departmentSlice';

const AddDepartment = ({ closeAddDepartmentModal }) => {
    const [department, setDepartment] = useState('');
    const { userDetails } = useSelector(state => state.user);
    const token = userDetails.UserToken;
    const dispatch = useDispatch();
    const handleDepartmentSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await addDepartment({ department, token });
            if (res.success) {
                const depData = await getAllDepartments(token);
                dispatch(setDepartmentData(depData))
                toast.success('Successfully Created...!', {
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
                closeAddDepartmentModal()
            } else {
                toast.error(res.message, {
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
            toast.error(error.message, {
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
                                <h3>Add Department</h3>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-sm-12 mb-2">
                                    <div className="form-group">
                                        <label>Department Name</label>
                                        <input type="text" className='form-control' id='nameOfTheHoliday'
                                            value={department} onChange={e => setDepartment(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="modal-btn delete-action">
                                <div className="row">
                                    <div className="col-6">
                                        <button className='btn btn-primary' onClick={handleDepartmentSubmit}>Save</button>
                                    </div>
                                    <div className="col-6">
                                        <button className='btn btn-primary' onClick={closeAddDepartmentModal}>Cancel</button>
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

export default AddDepartment