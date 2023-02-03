import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { attendanceList, getAttendanceData, updateAttendance } from '../../helper/AttendanceHelper'
import { useFormik } from 'formik'
import { getAllEmployees } from '../../helper/Employeehelper'
import { useDispatch } from 'react-redux'
import { setAllAttendance } from '../../redux/features/attendanceSlice'

const EditForm = ({ closeModal, id }) => {
    const [attendanceUpdateData, setAttendanceUpdateData] = useState('')
    const [employees, setEmployees] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            try {
                const attendanceData = await getAttendanceData(id)
                const employee = await getAllEmployees()
                setEmployees(employee.list)
                if (attendanceData.success) {
                    setAttendanceUpdateData(attendanceData.data);
                }
            } catch (error) {
                toast.error('Something Wrong', {
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

    const handleSubmit = async () => {
        try {
            const updating = await updateAttendance(attendanceUpdateData)
            if(updating.success){
                const attendance = await attendanceList()
                dispatch(setAllAttendance(attendance.data))
                toast.success(updating.message, {
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
                toast.error(updating.message, {
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
            toast.error('Not Updated. Something Wrong', {
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
                                <h3>Update Attendance</h3>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-sm-6 mb-2">
                                    <div className="form-group">
                                        <label>Name of the Employee</label>
                                        <select name="employee" id="employee"
                                            value={attendanceUpdateData ? attendanceUpdateData.employee : ''}
                                            onChange={(e) => setAttendanceUpdateData({ ...attendanceUpdateData, employee: e.target.value })} >
                                            <option value="">Select A Category</option>
                                            {employees ? employees.map(values => {
                                                return (
                                                    <option value={values._id}>{values.username}</option>
                                                )
                                            }) : ''}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-sm-6 mb-2">
                                    <div className="form-group">
                                        <label>Date</label>
                                        <input type="date" className='form-control' id='date'
                                            defaultValue={attendanceUpdateData ? new Date(attendanceUpdateData.date).toISOString().slice(0, 10) : ''}
                                            onChange={(e) => setAttendanceUpdateData({ ...attendanceUpdateData, date: e.target.value })} />
                                    </div>
                                </div>
                                <div className="col-sm-6 mb-2">
                                    <div className="form-group">
                                        <label>Sign In Time</label>
                                        <input type="time" className='form-control' id='signIn'
                                            value={attendanceUpdateData ? attendanceUpdateData.signIn : ''}
                                            onChange={(e) => setAttendanceUpdateData({ ...attendanceUpdateData, signIn: e.target.value })}  />
                                    </div>
                                </div>
                                <div className="col-sm-6 mb-2">
                                    <div className="form-group">
                                        <label>Sign Out Time</label>
                                        <input type="time" className='form-control' id='signOut'
                                            value={attendanceUpdateData ? attendanceUpdateData.signOut : ''}
                                            onChange={(e) => setAttendanceUpdateData({ ...attendanceUpdateData, signOut: e.target.value })}  />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="modal-btn delete-action">
                                <div className="row">
                                    <div className="col-6">
                                        <button className='btn btn-primary' onClick={handleSubmit}>Update</button>
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

export default EditForm