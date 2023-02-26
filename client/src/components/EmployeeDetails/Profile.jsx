import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { employeeCrendentialGenerate, employeeCrendentialReGenerate, updateCredentialPassword } from '../../helper/CredentialHelper';
import { getAllDepartments } from '../../helper/Departmenthelper';
import { getAllDesignation } from '../../helper/Designationhelper';
import { getEmployeeData, updateProfile } from '../../helper/Employeehelper';
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
import { setDepartmentData } from '../../redux/features/departmentSlice';
import { setDesignatonData } from '../../redux/features/designationSlice';
import { setEmpIndividualData } from '../../redux/features/employee';
import ChangePassword from './ChangePassword';

function Profile() {
    const location = useLocation();
    let empID = location.state?.id;
    const { departmentDetails } = useSelector(state => state.department)
    const { designationDetails } = useSelector(state => state.designation)
    const { loading } = useSelector(state => state.alerts);
    const { userDetails } = useSelector(state => state.user);
    const { employeeData } = useSelector(state => state.employees);

    const token = userDetails.UserToken;
    const role = userDetails.role;

    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            try {
                const employeeData = await getEmployeeData(empID, token);
                const departmentList = await getAllDepartments(token);
                const designationList = await getAllDesignation(token);
                let result = employeeData.data
                if (result.success) {
                    dispatch(setEmpIndividualData(result.data));
                    dispatch(setDepartmentData(departmentList));
                    dispatch(setDesignatonData(designationList.data));
                } else {
                    toast.error(result.data.message, {
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
                toast.error('Some Server Issue....!', {
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
    }, [])

    // Profile Updation
    const onSubmit = async (values, actions) => {
        dispatch(showLoading());
        try {
            const status = await updateProfile(values, empID, token)
            if (status.sucess) {
                const employeeData = await getEmployeeData(empID, token);
                let result = employeeData.data;
                dispatch(setEmpIndividualData(result.data));
                toast.success(status.message, {
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
                actions.resetForm();
                closeProfileUpdateModal()
                dispatch(hideLoading())
            } else {
                toast.error(status.message, {
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
                dispatch(hideLoading())
            }
        } catch (error) {
            toast.error('Something Wrong...!', {
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
        dispatch(hideLoading())
    }

    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: {
            department: employeeData.department?._id,
            designation: employeeData.designation?._id,
            dateofJoin: employeeData?.dateofJoin,
            contactNumber: employeeData?.contactNumber,
            email: employeeData?.email,
            dateofBirth: employeeData?.dateofBirth,
            place: employeeData?.place,
            gender: employeeData?.gender,
            role: employeeData?.role,
            taxType: employeeData?.taxType
        },
        onSubmit
    })

    const [showProfileUpddateModal, setShowProfileUpddateModal] = useState(false);
    const closeProfileUpdateModal = () => setShowProfileUpddateModal(false);

    const generatePassword = async (id) => {
        try {
            const generate = await employeeCrendentialGenerate(id, token)
            if (generate.success) {
                const employeeData = await getEmployeeData(empID, token);
                let result = employeeData.data;
                dispatch(setEmpIndividualData(result.data));
                toast.success(generate.message, {
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
            } else {
                toast.error(generate.message, {
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
            toast.error('Something Wrong...!', {
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

    const reGeneratePassword = async (id) => {
        try {
            const reGenerate = await employeeCrendentialReGenerate(id, token)
            if (reGenerate.success) {
                const employeeData = await getEmployeeData(empID, token);
                let result = employeeData.data;
                dispatch(setEmpIndividualData(result.data));
                toast.success(reGenerate.message, {
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
            } else {
                toast.error(reGenerate.message, {
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
            toast.error('Something Wrong...!', {
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

    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const closeChangePasswordModal = () => setShowChangePasswordModal(false);

    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <div className="profile">
                <div className="row">
                    <div className="edit">
                        <button className='edit-btn' onClick={() => setShowProfileUpddateModal(true)}>
                            <i className='fa fa-pencil'></i>
                        </button>
                    </div>
                    <div className='col-lg-5 profile-wrap'>
                        <div className="row">
                            <div className='col-lg-4'>
                                <img className="profile-img" src={employeeData?.image} alt="" />
                            </div>
                            <div className='col-lg-8 profile-info'>
                                <h3 className='username'>{employeeData?.firstName} {employeeData?.lastName}</h3>
                                <h6 className='designation'>{employeeData.designation?.designation}</h6>
                                <div className='department'>{employeeData.department?.department}</div>
                                <div className='empID'>Employee ID : {employeeData?.empCode}</div>
                                <div className='doj'>Date of join :{employeeData?.dateofJoin ?
                                    new Date(employeeData.dateofJoin).toLocaleDateString('en-GB', {
                                        day: 'numeric', month: 'short', year: 'numeric'
                                    }) : ''}
                                </div>
                                <div className='status'>Status : <span>Active</span></div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-7 personal-wrap'>
                        <ul className="personal-info">
                            <li>
                                <div className="title">Phone No:</div>
                                <div className="text">{employeeData?.contactNumber}</div>
                            </li>
                            <li>
                                <div className="title">Email:</div>
                                <div className="text">{employeeData?.email}</div>
                            </li>
                            <li>
                                <div className="title">Birthday:</div>
                                <div className="text">{employeeData?.dateofBirth ?
                                    new Date(employeeData?.dateofBirth).toLocaleDateString('en-GB', {
                                        day: 'numeric', month: 'short', year: 'numeric'
                                    }) : ''}</div>
                            </li>
                            <li>
                                <div className="title">Place:</div>
                                <div className="text">{employeeData.place ? employeeData.place : 'Nil'}</div>
                            </li>
                            <li>
                                <div className="title">Gender:</div>
                                <div className="text">{employeeData?.gender}</div>
                            </li>
                            <li>
                                <div className="title">User Type:</div>
                                <div className="text">{employeeData?.role}</div>
                            </li>
                            <li>
                                <div className="title">Tax Type:(EPF,PT,TDS..)</div>
                                <div className="text">{employeeData.taxType ? employeeData?.taxType : 'Nil'}</div>
                            </li>
                        </ul>
                        {role === 'Admin' &&
                            <>
                                {employeeData?.loginPermisionEnabled &&
                                    <div className="password-generat">
                                        <button className='btn btn-danger' onClick={() => reGeneratePassword(employeeData._id)} >Re-Generate Password</button>
                                    </div>}
                                {!employeeData?.loginPermisionEnabled &&
                                    <div className="password-generat">
                                        <button className='btn btn-danger' onClick={() => generatePassword(employeeData._id)} >Generate Password</button>
                                    </div>}
                            </>
                        }
                        {role === 'Employee' &&
                            <div className="password-generat">
                                <button className='btn btn-success' onClick={() => setShowChangePasswordModal(true)} >Change Password</button>
                            </div>}
                    </div>
                </div>

                {showProfileUpddateModal &&
                    <div className="modal-wrapper">
                        <div className="modal-container">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <div className="form-header">
                                        <h3>Update Profile Info</h3>
                                    </div>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Department</label>
                                                <select name="" id="department"
                                                    value={values?.department}
                                                    onChange={handleChange}>
                                                    <option value="">Select Department</option>
                                                    {departmentDetails.map(values => {
                                                        return (
                                                            <option value={values?._id}>{values?.department}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Designation</label>
                                                <select name="" id="designation"
                                                    value={values?.designation}
                                                    onChange={handleChange}>
                                                    <option value="">Select Designation</option>
                                                    {designationDetails.map(values => {
                                                        return (
                                                            <option value={values?._id}>{values?.designation}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Date of Join</label>
                                                <input type="date" className='form-control' id='dateofJoin'
                                                    defaultValue={values.dateofJoin ?
                                                        new Date(values?.dateofJoin).toISOString().slice(0, 10) : ''}
                                                    onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Phone No</label>
                                                <input type="number" className='form-control' id='contactNumber'
                                                    value={values?.contactNumber}
                                                    onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Email</label>
                                                <input type="email" className='form-control' id='email'
                                                    value={values?.email}
                                                    onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Date of Birthday</label>
                                                <input type="date" className='form-control' id='dateofBirth'
                                                    defaultValue={values?.dateofBirth ?
                                                        new Date(values.dateofBirth).toISOString().slice(0, 10) : ''}
                                                    onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Address</label>
                                                <input type="text" className='form-control' id='address'
                                                    value={values?.place}
                                                    onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Gender</label>
                                                <select name="" id="gender"
                                                    value={values?.gender}
                                                    onChange={handleChange}>
                                                    <option value="">Select Gender</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>UserType</label>
                                                <select name="" id="role"
                                                    value={values?.role}
                                                    onChange={handleChange}>
                                                    <option value="">Select Role</option>
                                                    <option value="Employee">Employee</option>
                                                    {role === 'Admin' &&
                                                        <>
                                                            <option value="HR">HR</option>
                                                            <option value="Admin">Admin</option>
                                                        </>
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Tax Type</label>
                                                <select name="" id="taxType"
                                                    value={values?.taxType}
                                                    onChange={handleChange}>
                                                    <option value="">Select Tax</option>
                                                    <option value="EPF">EPF</option>
                                                    <option value="Professional Tax">Professional Tax</option>
                                                    <option value="TDS">TDS</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <div className="modal-btn delete-action">
                                        <div className="row">
                                            {loading && <div class="d-flex justify-content-center">
                                                <div class="spinner-border text-primary" role="status">
                                                    <span class="sr-only">Loading...</span>
                                                </div>
                                            </div>}
                                            {!loading &&
                                                <div className='d-flex'>
                                                    <div className="col-6">
                                                        <button className='btn btn-primary' onClick={handleSubmit}>Update</button>
                                                    </div>
                                                    <div className="col-6">
                                                        <button className='btn btn-primary' onClick={closeProfileUpdateModal}>Cancel</button>
                                                    </div>
                                                </div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
            </div>

            {showChangePasswordModal && <ChangePassword closeModal={closeChangePasswordModal} id={empID} token={token} />}
        </>
    )
}

export default Profile