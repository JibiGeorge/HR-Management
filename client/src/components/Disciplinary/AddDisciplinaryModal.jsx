import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployeeDisciplinary, getAllEmployeesAllDetails, getDisciplinaryData } from '../../helper/Employeehelper';
import { useFormik } from 'formik';
import { setDisciplinaryData } from '../../redux/features/disciplinarySlice';

const AddDisciplinaryModal = ({ closeAddDisciplinaryModal }) => {
    const { userDetails } = useSelector(state => state.user);
    const [employeeList, setEmployeeList] = useState([]);
    const [department, setDepartment] = useState("");
    const [designation, setDesignation] = useState("");
    const dispatch = useDispatch();

    const token = userDetails.UserToken;

    useEffect(() => {
        (async () => {
            try {
                const employeeList = await getAllEmployeesAllDetails(token);
                if (employeeList.success) {
                    setEmployeeList(employeeList.employees);
                } else {
                    closeAddDisciplinaryModal();
                    toast.error('Something Went Wrong..!', {
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
                closeAddDisciplinaryModal();
                toast.error('Something Went Wrong..!', {
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

    const handleEmployeeChange = (event, setFieldValue) => {
        const employeeId = event.target.value;
        const selectedEmployee = employeeList?.find(
            (employee) => employee._id === employeeId
        );
        setDepartment(selectedEmployee.department?.department)
        setDesignation(selectedEmployee.designation?.designation)
        setFieldValue('employeeId', employeeId);
        setFieldValue('department', selectedEmployee?.department?._id || '');
        setFieldValue('designation', selectedEmployee?.designation?._id || '');
    }

    const onSubmit = async (values) => {
        try {
            const addDisciplinary = await addEmployeeDisciplinary(values, token);
            if (addDisciplinary.success) {
                const disciplinaryData = await getDisciplinaryData(token);
                dispatch(setDisciplinaryData(disciplinaryData?.data));
                closeAddDisciplinaryModal();
                toast.success(addDisciplinary.message, {
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
                toast.error(addDisciplinary?.message, {
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
            toast.error('Not Added. Please try Again..!', {
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

    const { values, handleSubmit, handleChange, setFieldValue, touched, errors } = useFormik({
        initialValues: {
            employeeId: '',
            department: '',
            designation: '',
            disciplinaryAction: '',
            title: '',
            details: ''
        },
        validate: (values) => {
            const errors = {};

            if (!values.employeeId) {
                errors.employeeId = 'Employee name is required';
            }
            if (!values.disciplinaryAction) {
                errors.disciplinaryAction = 'Disciplinary Action is required';
            }
            if (!values.title) {
                errors.title = 'Title is required';
            }
            if (!values.details) {
                errors.details = 'Detail of Action is required';
            }
            return errors;
        },
        onSubmit,
        enableReinitialize: true,
    })

    return (
        <>
            <div className="modal-wrapper">
                <div className="modal-container">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="form-header">
                                <h3>Add Assets Category</h3>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Employee Name</label>
                                        <select name="assetCategory" id="employeeId" value={values?.employeeId}
                                            onChange={(e) => handleEmployeeChange(e, setFieldValue)}>
                                            <option value="">Select A Employee</option>
                                            {employeeList && employeeList?.map((res) =>
                                            (
                                                <option value={res?._id} >{res?.firstName} {res?.lastName}</option>
                                            )
                                            )}
                                        </select>
                                        {touched.employeeId && errors.employeeId ? (
                                            <div className="error">{errors.employeeId}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Department</label>
                                        <input type="text" className='form-control' id='department' readOnly value={department} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Designation</label>
                                        <input type="text" className='form-control' id='designation' readOnly value={designation} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Disciplinary Action</label>
                                        <select id="disciplinaryAction" value={values?.disciplinaryAction} onChange={handleChange}>
                                            <option value="">Select A Employee</option>
                                            <option value="Suspension">Suspension</option>
                                            <option value="Verbal">Verbal</option>
                                            <option value="Writing">Writing</option>
                                            <option value="Demotion">Demotion</option>
                                        </select>
                                        {touched.disciplinaryAction && errors.disciplinaryAction ? (
                                            <div className="error">{errors.disciplinaryAction}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <label>Title</label>
                                        <input type="text" className='form-control' id='title' value={values?.title} onChange={handleChange} />
                                        {touched.title && errors.title ? (
                                            <div className="error">{errors.title}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <label>Details</label>
                                        <textarea className='form-control' id='details' value={values?.details} onChange={handleChange} />
                                        {touched.details && errors.details ? (
                                            <div className="error">{errors.details}</div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="modal-btn delete-action">
                                <div className="button">
                                    <div>
                                        <button className='btn btn-primary' onClick={handleSubmit}>Save</button>
                                    </div>
                                    <div>
                                        <button className='btn btn-primary' onClick={closeAddDisciplinaryModal}>Cancel</button>
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

export default AddDisciplinaryModal