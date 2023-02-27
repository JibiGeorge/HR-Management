import React from 'react'
import { useFormik } from 'formik'
import { employeeSchema } from '../../schemas/employeeSchema'
import { useEffect } from 'react';
import { getAllDepartments } from '../../helper/Departmenthelper';
import { getAllDesignation } from '../../helper/Designationhelper';
import { useState } from 'react';
import { addEmployee } from '../../helper/Employeehelper';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
import { useNavigate } from 'react-router-dom';

function AddForm({empCode}) {

    var dispatch = useDispatch();
    const navigate = useNavigate()
    const { loading } = useSelector(state => state.alerts);
    const { userDetails } = useSelector(state => state.user);

    const [designation, setDesignation] = useState([]);
    const [department, setDepartment] = useState([]);

    let token = userDetails.UserToken;
    const role = userDetails?.role;
    const onSubmit = async (values, actions) => {
        dispatch(showLoading())
        try {
            const result = await addEmployee(values, token);
            if (result.data.success) {
                toast.success(result.data.message, {
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
                navigate('/hr/employee')
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
        dispatch(hideLoading())

    }

    useEffect(() => {
        (async () => {
            try {
                const departmentlist = await getAllDepartments(token);
                const designationlist = await getAllDesignation(token);
                setDepartment(departmentlist);
                setDesignation(designationlist.data);
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
        })()
    }, [])



    const { values, errors, touched, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            empCode: empCode,
            department: "",
            designation: "",
            role: "",
            gender: "",
            bloodGroup: "",
            panNumber: "",
            contactNumber: "",
            dateofBirth: "",
            dateofJoin: "",
            dateofLeave: "",
            username: "",
            email: "",
            image: ""
        },
        validationSchema: employeeSchema,
        enableReinitialize: true,
        onSubmit
    });

    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <div className="form">
                <div className="form-body">
                    <h3 className="form-title">Add Employee</h3>
                    <form action="" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-lg-4 col-sm-6">
                                <div className="form-group">
                                    <div className='title'>
                                        <label className='col-form-label'>First Name
                                            <span className="text-danger me-2">*</span>
                                            {errors.firstName && touched.firstName && <span className='error'>{errors.firstName}</span>}
                                        </label>
                                    </div>
                                    <div className='select '>
                                        <input type="text" placeholder='Enter First Name'
                                            value={values.firstName}
                                            onChange={handleChange} id="firstName" className={errors.firstName && touched.firstName ? "input-error" : ""} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                                <div className="form-group">
                                    <div className='title'>
                                        <label className='col-form-label'>Last Name
                                        </label>
                                    </div>
                                    <div className='select '>
                                        <input type="text" placeholder='Enter Last Name'
                                            value={values.lastName}
                                            onChange={handleChange} id="lastName" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                                <div className="form-group">
                                    <div className='title'>
                                        <label className='col-form-label'>Employee Code
                                            <span className="text-danger me-2">*</span>
                                            {errors.empCode && touched.empCode && <span className='error'>{errors.empCode}</span>}
                                        </label>
                                    </div>
                                    <div className='select '>
                                        <input type="text" placeholder='Enter Employee Code' disabled
                                            value={values.empCode}
                                            onChange={handleChange} id="empCode" className={errors.empCode && touched.empCode ? "input-error" : ""} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                                <div className="form-group">
                                    <div className='title'>
                                        <label className='col-form-label'>Department
                                            <span className="text-danger me-2">*</span>
                                            {errors.department && touched.department && <span className='error'>{errors.department}</span>}
                                        </label>
                                    </div>
                                    <div className='select '>
                                        <select name="" id="department"
                                            value={values.department}
                                            onChange={handleChange} className={errors.department && touched.department ? "input-error" : ""} >
                                            <option value="">Select Department</option>
                                            {department?.map(values => {
                                                return (
                                                    <option value={values?._id}>{values?.department}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                                <div className="form-group">
                                    <div className='title'>
                                        <label className='col-form-label'>Designation
                                            <span className="text-danger me-2">*</span>
                                            {errors.designation && touched.designation && <span className='error'>{errors.designation}</span>}
                                        </label>
                                    </div>
                                    <div className='select '>
                                        <select name="" id="designation"
                                            value={values.designation}
                                            onChange={handleChange} className={errors.designation && touched.designation ? "input-error" : ""}>
                                            <option value="">Select Designation</option>
                                            {designation?.map(values => {
                                                return (
                                                    <option value={values?._id}>{values?.designation}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                                <div className="form-group">
                                    <div className='title'>
                                        <label className='col-form-label'>Role
                                            <span className="text-danger me-2">*</span>
                                            {errors.role && touched.role && <span className='error'>{errors.role}</span>}
                                        </label>
                                    </div>
                                    <div className='select '>
                                        <select name="" id="role"
                                            value={values.role}
                                            onChange={handleChange} className={errors.role && touched.role ? "input-error" : ""}>
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
                            </div>
                            <div className="col-lg-4 col-sm-6">
                                <div className="form-group">
                                    <div className='title'>
                                        <label className='col-form-label'>Gender
                                            <span className="text-danger me-2">*</span>
                                            {errors.gender && touched.gender && <span className='error'>{errors.gender}</span>}
                                        </label>
                                    </div>
                                    <div className='select '>
                                        <select name="" id="gender"
                                            value={values.gender}
                                            onChange={handleChange} className={errors.gender && touched.gender ? "input-error" : ""}>
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                                <div className="form-group">
                                    <div className='title'>
                                        <label className='col-form-label'>Blood Group
                                        </label>
                                    </div>
                                    <div className='select '>
                                        <select name="" id="bloodGroup"
                                            value={values.bloodGroup}
                                            onChange={handleChange}>
                                            <option value="">Select Blood Group</option>
                                            <option value="O+">O+</option>
                                            <option value="O-">O-</option>
                                            <option value="AB+">AB+</option>
                                            <option value="AB-">AB-</option>
                                            <option value="B+">B+</option>
                                            <option value="B">B-</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                                <div className="form-group">
                                    <div className='title'>
                                        <label className='col-form-label'>PAN Number
                                        </label>
                                    </div>
                                    <div className='select '>
                                        <input type="text" id='panNumber' placeholder='Enter PAN Number'
                                            value={values.panNumber}
                                            onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                                <div className="form-group">
                                    <div className='title'>
                                        <label className='col-form-label d-flex'>Contact Number
                                            <span className="text-danger me-2">*</span>
                                            {errors.contactNumber && touched.contactNumber && <span className='error'>{errors.contactNumber}</span>}
                                        </label>
                                    </div>
                                    <div className='select '>
                                        <input type="text" id='contactNumber' placeholder='Enter Contact Number'
                                            value={values.contactNumber}
                                            onChange={handleChange} className={errors.contactNumber && touched.contactNumber ? "input-error" : ""} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                                <div className="form-group">
                                    <div className='title'>
                                        <label className='col-form-label'>Date of Birth
                                        </label>
                                    </div>
                                    <div className='select '>
                                        <input type="date" id='dateofBirth'
                                            value={values.dateofBirth}
                                            onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                                <div className="form-group">
                                    <div className='title'>
                                        <label className='col-form-label'>Date of Joinig
                                            <span className="text-danger me-2">*</span>
                                            {errors.dateofJoin && touched.dateofJoin && <span className='error'>{errors.dateofJoin}</span>}
                                        </label>
                                    </div>
                                    <div className='select '>
                                        <input type="date" id='dateofJoin'
                                            value={values.dateofJoin}
                                            onChange={handleChange} className={errors.dateofJoin && touched.dateofJoin ? "input-error" : ""} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                                <div className="form-group">
                                    <div className='title'>
                                        <label className='col-form-label'>Date of Leave
                                        </label>
                                    </div>
                                    <div className='select '>
                                        <input type="date" id='dateofLeave'
                                            value={values.dateofLeave}
                                            onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                                <div className="form-group">
                                    <div className='title'>
                                        <label className='col-form-label'>Username
                                            <span className="text-danger me-2">*</span>
                                            {errors.username && touched.username && <span className='error'>{errors.username}</span>}
                                        </label>
                                    </div>
                                    <div className='select '>
                                        <input type="text" placeholder='Enter Username' id='username'
                                            value={values.username}
                                            onChange={handleChange} className={errors.username && touched.username ? "input-error" : ""} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                                <div className="form-group">
                                    <div className='title'>
                                        <label className='col-form-label'>Email
                                            <span className="text-danger me-2">*</span>
                                            {errors.email && touched.email && <span className='error'>{errors.email}</span>}
                                        </label>
                                    </div>
                                    <div className='select '>
                                        <input type="email" placeholder='Enter Email' id='email'
                                            values={values.email}
                                            onChange={handleChange} className={errors.email && touched.email ? "input-error" : ""} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                                <div className="form-group">
                                    <div className='title'>
                                        <label className='col-form-label'>Photo
                                            <span className="text-danger me-2">*</span>
                                            {errors.image && touched.image && <span className='error'>{errors.image}</span>}
                                        </label>
                                    </div>
                                    <div className='select '>
                                        <input type="file" name='image' id='image'
                                            // value={values.image}
                                            onChange={(e) => setFieldValue('image', e.target.files[0])} className={errors.image && touched.image ? "input-error" : ""} />
                                    </div>
                                </div>
                            </div>
                            {loading && <div class="d-flex justify-content-center">
                                <div class="spinner-border text-primary" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>}
                            {!loading &&
                                <div className='form-button'>
                                    <button type='submit' className='btn btn-primary add-btn'>Submit</button>
                                </div>}
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddForm