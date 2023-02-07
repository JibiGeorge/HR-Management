import { useFormik } from 'formik'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { addAttendance, attendanceList } from '../../helper/AttendanceHelper'
import { getAllEmployees } from '../../helper/Employeehelper'
import { setAllAttendance } from '../../redux/features/attendanceSlice'

const AddModal = ({ closeModal }) => {
    const [employees, setEmployees] = useState([])
    const { userDetails } = useSelector(state => state.user);
    const token = userDetails.UserToken;

    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            try {
                const employee = await getAllEmployees(token)
                setEmployees(employee.list)
            } catch (error) {
                toast.error('Smomething Wrong...!', {
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
        })()
    }, [])

    const onSubmit = async (values) => {
        try {
            const add = await addAttendance(values, token)
            if (add.success) {
                const attendance = await attendanceList(token)
                dispatch(setAllAttendance(attendance.data))
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
            } else {
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
            toast.error('Not Added. Smomething Went Wrong...!', {
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

    const { values, handleSubmit, handleChange } = useFormik({
        initialValues: {
            employee: '',
            date: '',
            signIn: '',
            signOut: ''
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
                                <h3>Add Attendance</h3>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-sm-6 mb-2">
                                    <div className="form-group">
                                        <label>Name of the Employee</label>
                                        <select name="employee" id="employee"
                                            value={values.employee} onChange={handleChange} >
                                            <option value="">Select A Category</option>
                                            {employees ? employees.map(values => {
                                                return (
                                                    <option value={values._id} >{values.username}</option>
                                                )
                                            }) : ''}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-sm-6 mb-2">
                                    <div className="form-group">
                                        <label>Date</label>
                                        <input type="date" className='form-control' id='date'
                                            value={values.date} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="col-sm-6 mb-2">
                                    <div className="form-group">
                                        <label>Sign In Time</label>
                                        <input type="time" className='form-control' id='signIn'
                                            value={values.signIn} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="col-sm-6 mb-2">
                                    <div className="form-group">
                                        <label>Sign Out Time</label>
                                        <input type="time" className='form-control' id='signOut'
                                            value={values.signOut} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="modal-btn delete-action">
                                <div className="row">
                                    <div className="col-6 justify-center">
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

export default AddModal