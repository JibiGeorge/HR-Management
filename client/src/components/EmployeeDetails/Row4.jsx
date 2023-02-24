import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployeeSalary, deleteSalaryData, getSalaryData } from '../../helper/EmployeeSalary';
import DataTable from 'react-data-table-component';
import { setEmployeeSalaryDetails } from '../../redux/features/salarySlice';
import { useLocation } from 'react-router-dom';

const Row4 = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    let empID = location.state?.id;
    const [showAddSalaryForm, setShowAddSalaryForm] = useState(false);
    const closeAddSalaryForm = () => setShowAddSalaryForm(false);

    const { userDetails } = useSelector(state => state.user);
    const token = userDetails.UserToken;

    const { salaryDetails } = useSelector(state => state.employeeSalary);

    useEffect(() => {
        (async () => {
            try {
                const data = await getSalaryData(token, empID);
                if (data.success) {
                    dispatch(setEmployeeSalaryDetails(data.data));
                } else {
                    toast.error(data.message, {
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

    const onSubmit = async (values, actions) => {
        try {
            const addSalary = await addEmployeeSalary(token, empID, values);
            if (addSalary.success) {
                const data = await getSalaryData(token, empID);
                if (data.success) {
                    dispatch(setEmployeeSalaryDetails(data?.data));
                }
                toast.success(addSalary.message, {
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
                closeAddSalaryForm()
            } else {
                toast.error(addSalary.message, {
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
            toast.error('Adding Failed. Please Try Again..!', {
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
            salaryType: '',
            totalSalary: '',
            basicSalary: '',
            houseRent: '',
            medical: '',
            conveyance: '',
            fromDate: '',
            toDate: ''
        },
        onSubmit
    })

    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const closeDeleteConfirmation = () => setDeleteConfirmation(false);
    const [salaryDetailsID, setSalaryDetailsID] = useState('');

    const handleDeleteSalary = (id) => {
        setDeleteConfirmation(true);
        setSalaryDetailsID(id)
    }

    const deleteSalaryDetails = async () => {
        try {
            const deleteData = await deleteSalaryData(token, salaryDetailsID);
            if (deleteData.success) {
                const data = await getSalaryData(token, empID);
                if (data.success) {
                    dispatch(setEmployeeSalaryDetails(data?.data));
                }
                toast.success(deleteData.message, {
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
                closeDeleteConfirmation();
            } else {
                toast.error(deleteData.message, {
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
            toast.error('Failed to Delete..!', {
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

    const column = [
        {
            name: 'Salary Type',
            selector: row => row?.salaryType
        },
        {
            name: 'Basic Salary',
            selector: row => row?.basicSalary
        },
        {
            name: 'House Rent',
            selector: row => row?.houseRent
        },
        {
            name: 'Medical',
            selector: row => row?.medical
        },
        {
            name: 'Conveyance',
            selector: row => row?.conveyance
        },
        {
            name: 'Total Salary',
            selector: row => row?.totalSalary
        },
        {
            name: 'From Date',
            selector: row => row.fromDate ? new Date(row?.fromDate).toLocaleDateString('en-GB', {
                day: 'numeric', month: 'short', year: 'numeric'
            }) : ''
        },
        {
            name: 'To Date',
            selector: row => row.toDate ? new Date(row?.toDate).toLocaleDateString('en-GB', {
                day: 'numeric', month: 'short', year: 'numeric'
            }) : ''
        },
        {
            name: "Action",
            cell: (row) => (
                <button className='btn deleteBtn' onClick={() => handleDeleteSalary(row?._id)}><i class="las la-trash"></i></button>)
        }
    ]
    return (
        <>
            <div className="row box salary">
                <div className="col-lg-12 box1">
                    <div className="row3">
                        <div className="d-flex justify-content-between">
                            <h3 className='title'>Salary Details</h3>
                            <div className="col-sm-3">
                                <button to='/addEmployee' class="btn btn-primary add-btn" onClick={() => setShowAddSalaryForm(true)}>
                                    Add New
                                </button>
                            </div>
                        </div>
                        {showAddSalaryForm &&
                            <div className="row add-salary">
                                <div className="col-lg-12">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>Salary Type</label>
                                                <select className='form-select' id='salaryType'
                                                    value={values.salaryType}
                                                    onChange={handleChange}>
                                                    <option value="">Select a Type</option>
                                                    <option value="Weekly">Weekly</option>
                                                    <option value="Daily">Daily</option>
                                                    <option value="Monthly">Monthly</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>Total Salary</label>
                                                <input type="number" className="form-control" id='totalSalary'
                                                    value={values.totalSalary} onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="row">
                                        <h3>Addition</h3>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>Basic Salary</label>
                                                <input type="number" className='form-control' id='basicSalary'
                                                    value={values.basicSalary} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>House Rent</label>
                                                <input type="number" className='form-control' id='houseRent'
                                                    value={values.houseRent} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>Medical</label>
                                                <input type="number" className='form-control' id='medical'
                                                    value={values.medical} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>Conveyance</label>
                                                <input type="number" className='form-control' id='conveyance'
                                                    value={values.conveyance} onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                </div>                                
                                <div className="col-lg-12">
                                    <div className="row">
                                        <h3>Period</h3>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>Basic Salary</label>
                                                <input type="date" className='form-control' id='fromDate'
                                                    value={values.fromDate} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>To Date</label>
                                                <input type="date" className='form-control' id='toDate'
                                                    value={values.toDate} onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <button className='btn btn-primary me-3' onClick={handleSubmit}>ADD</button>
                                            <button className='btn btn-danger me-3' onClick={closeAddSalaryForm}>Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>}

                        {/* Data Table */}
                        <div className="row mt-4">
                            <DataTable
                                columns={column}
                                data={salaryDetails}
                                pagination
                                fixedHeader
                                fixedHeaderScrollHeight='300px'
                                selectableRowsHighlight
                                highlightOnHover
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation */}
            {deleteConfirmation &&
                <div className="modal-wrapper">
                    <div className="modal-container">
                        <div className="modal-content">
                            <div className="modal-header">
                                <div className="form-header">
                                    <h3>Delete Confirmation</h3>
                                    <p>Are you Sure want to Delete?</p>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="modal-btn delete-action">
                                    <div className="row">
                                        <div className="col-6">
                                            <button className='btn btn-primary' onClick={deleteSalaryDetails}>Delete</button>
                                        </div>
                                        <div className="col-6">
                                            <button className='btn btn-primary' onClick={closeDeleteConfirmation}>Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Row4