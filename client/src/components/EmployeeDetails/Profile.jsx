import { useFormik } from 'formik';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { employeeCrendentialGenerate, employeeCrendentialReGenerate } from '../../helper/CredentialHelper';
import { getEmployeeData, updateProfile } from '../../helper/Employeehelper';
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
import { setEmpIndividualData } from '../../redux/features/employee';

function Profile(props) {
    const profileData = props.profile;
    const { departmentDetails } = useSelector(state => state.department)
    const { designationDetails } = useSelector(state => state.designation)
    const { loading } = useSelector(state => state.alerts);

    const dispatch = useDispatch();

    // Profile Updation
    let empID = profileData._id
    const onSubmit = async (values, actions) => {
        dispatch(showLoading());
        try {
            const status = await updateProfile(values, empID)
            if (status.sucess) {
                const employeeData = await getEmployeeData(empID);
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
            department: profileData.department?._id,
            designation: profileData.designation?._id,
            dateofJoin: profileData?.dateofJoin,
            contactNumber: profileData?.contactNumber,
            email: profileData?.email,
            dateofBirth: profileData?.dateofBirth,
            place: profileData?.place,
            gender: profileData?.gender,
            role: profileData?.role
        },
        onSubmit
    })

    const [showProfileUpddateModal, setShowProfileUpddateModal] = useState(false);
    const closeProfileUpdateModal = () => setShowProfileUpddateModal(false);

    const generatePassword = async (id)=>{
        try {
            const generate = await employeeCrendentialReGenerate(id)
            if(generate.success){
                const employeeData = await getEmployeeData(empID);
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
            }else{
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

    const reGeneratePassword =async (id)=>{
        try {
            const reGenerate = await employeeCrendentialReGenerate(id)
            if(reGenerate.success){
                const employeeData = await getEmployeeData(empID);
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
            }else{
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
                                <img className="profile-img" src={profileData?.image} alt="" />
                            </div>
                            <div className='col-lg-8 profile-info'>
                                <h3 className='username'>{profileData?.firstName} {profileData?.lastName}</h3>
                                <h6 className='designation'>{profileData.designation?.designation}</h6>
                                <div className='department'>{profileData.department?.department}</div>
                                <div className='empID'>Employee ID : {profileData?.empCode}</div>
                                <div className='doj'>Date of join :{profileData?.dateofJoin ?
                                    new Date(profileData.dateofJoin).toLocaleDateString('en-GB', {
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
                                <div className="text">{profileData?.contactNumber}</div>
                            </li>
                            <li>
                                <div className="title">Email:</div>
                                <div className="text">{profileData?.email}</div>
                            </li>
                            <li>
                                <div className="title">Birthday:</div>
                                <div className="text">{profileData?.dateofBirth ?
                                    new Date(profileData?.dateofBirth).toLocaleDateString('en-GB', {
                                        day: 'numeric', month: 'short', year: 'numeric'
                                    }) : ''}</div>
                            </li>
                            <li>
                                <div className="title">Place:</div>
                                <div className="text">{profileData.place ? profileData.place : 'Nil'}</div>
                            </li>
                            <li>
                                <div className="title">Gender:</div>
                                <div className="text">{profileData?.gender}</div>
                            </li>
                            <li>
                                <div className="title">User Type:</div>
                                <div className="text">{profileData?.role}</div>
                            </li>
                        </ul>
                        {profileData?.loginPermisionEnabled && 
                         <div className="password-generat">
                         <button className='btn btn-danger' onClick={()=> reGeneratePassword(profileData._id)} >Re-Generate Password</button>
                     </div>}
                     {!profileData?.loginPermisionEnabled &&
                        <div className="password-generat">
                            <button className='btn btn-danger' onClick={()=> generatePassword(profileData._id)} >Generate Password</button>
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
                                                    <option value="HR">HR</option>
                                                    <option value="Admin">Admin</option>
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
        </>
    )
}

export default Profile