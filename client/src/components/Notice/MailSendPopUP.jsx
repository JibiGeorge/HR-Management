import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDepartments } from '../../helper/Departmenthelper';
import { getAllDesignation } from '../../helper/Designationhelper';
import { getAllEmployees } from '../../helper/Employeehelper';
import { mailSend } from '../../helper/NoticeHelper';
import { setDepartmentData } from '../../redux/features/departmentSlice';
import { setDesignatonData } from '../../redux/features/designationSlice';
import { setEmployeesData } from '../../redux/features/employee';
import { useFormik } from 'formik'

const MailSendPopUP = ({ closeMailModal, noticeDetails }) => {
    const dispatch = useDispatch();
    const { userDetails } = useSelector(state => state.user);
    const { departmentDetails } = useSelector(state => state.department);
    const { designationDetails } = useSelector(state => state.designation);
    const { employeesDetails } = useSelector(state => state.employees);
    const [filteredDesignationData, setFilteredDesignationData] = useState(designationDetails)
    const [filteredEmployeeData, setFilteredEmployeeData] = useState(employeesDetails)
    const token = userDetails.UserToken;

    useEffect(() => {
        (async () => {
            try {
                const depData = await getAllDepartments(token);
                const designationData = await getAllDesignation(token);
                const employeeList = await getAllEmployees(token);
                dispatch(setEmployeesData(employeeList?.list))
                dispatch(setDepartmentData(depData))
                dispatch(setDesignatonData(designationData.data));
            } catch (error) {
                toast.error('Something Went Wrong', {
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
        })();
    }, []);

    // Filtering By Department
    const handleShowDesignation = (departmentID) => {

        const designationResult = designationDetails.filter((designation) => {
            if (departmentID == "") {
                return true; // if the filterValue is empty, return all data
            } else {
                return designation.departmentId?._id.toLowerCase().includes(departmentID.toLowerCase());
            }
        })

        const EmployeeResult = employeesDetails.filter((employees) => {
            if (departmentID == "") {
                return true; // if the filterValue is empty, return all data
            } else {
                return employees?.department.toLowerCase().includes(departmentID.toLowerCase());
            }
        })

        setFilteredEmployeeData(EmployeeResult);
        setFilteredDesignationData(designationResult);
    }

    //Filtering By Designation
    const handleShowEmployees = (designationID) => {
        const result = employeesDetails.filter((employees) => {
            if (designationID == "") {
                return true;// if the filterValue is empty, return all data
            } else {
                return employees?.designation.toLowerCase().includes(designationID.toLowerCase());
            }
        })
        setFilteredEmployeeData(result);
    }

    // Mail Sending
    const onSubmit = async (values) => {
        try {
            const sendMailStatus = await mailSend(token, noticeDetails, values);
            if (sendMailStatus.success) {
                toast.success(sendMailStatus.message, {
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
                closeMailModal();
            } else {
                toast.error(sendMailStatus.message, {
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
            toast.error('Mail Sending Failed', {
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

    const { values, handleSubmit, handleChange, setFieldValue } = useFormik({
        initialValues: {
            department: '',
            designation: '',
            employee: ''
        },

        onSubmit,
    })
    return (
        <>
            <div className="modal-wrapper">
                <div className="modal-container">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="form-header">
                                <h3>Send Mail</h3>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-lg-12 mb-2">
                                    <div className="mail">
                                        <div className="subject mb-2">
                                            <label><b><span>Subject of the Mail :- </span>{noticeDetails?.title}</b></label>
                                        </div>
                                        <div className='mail-body'>
                                            <span>
                                                <p>Dear Employee,</p>
                                                <p className='mb-3'>{noticeDetails?.message}</p>
                                                <p>Thanks</p>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 mb-2">
                                    <div className="form-group">
                                        <label>Mail Send To Department</label>
                                        <select name="" id="department" onChange={(e) => { handleShowDesignation(e.target.value); setFieldValue("department", e.target.value) }}>
                                            <option value="">Select a Department</option>
                                            {departmentDetails?.map((values) => {
                                                return (
                                                    <option value={values._id}>{values.department}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-sm-6 mb-2">
                                    <div className="form-group">
                                        <label>Mail Send To Designation</label>
                                        <select name="" id="designation" onChange={(e) => { handleShowEmployees(e.target.value); setFieldValue("designation", e.target.value) }}>
                                            <option value="">Select a Designation</option>
                                            {filteredDesignationData?.map((values) => {
                                                return (
                                                    <option value={values._id}>{values.designation}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-sm-6 mb-2">
                                    <div className="form-group">
                                        <label>Mail Send To Employee</label>
                                        <select name="" id="employee" onChange={handleChange}>
                                            <option value="">Select a Employee</option>
                                            {filteredEmployeeData?.map((employee) => {
                                                return (
                                                    <option value={employee._id}>{employee.username}</option>
                                                )
                                            })}
                                        </select>
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
                                        <button className='btn btn-primary' onClick={closeMailModal}>Cancel</button>
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

export default MailSendPopUP