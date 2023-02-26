import React, { useEffect } from 'react'
import { useState } from 'react'
import { deleteDepartment, getAllDepartments, updateDepartment } from '../../helper/Departmenthelper.js'
import DataTable from 'react-data-table-component';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/features/alertSlice';
import { setDepartmentData, deleteDepartmentData } from '../../redux/features/departmentSlice.js';

function Departmentlist() {
    const [search, setSearch] = useState('')
    const [updatedeptValue, setUpdateDeptValue] = useState('');
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.alerts);
    const { departmentDetails } = useSelector(state => state.department)
    const { userDetails } = useSelector(state => state.user);

    const token = userDetails.UserToken;

    // Geting all Department Details from Database
    useEffect(() => {
        try {
            (async () => {
                dispatch(showLoading())
                const depData = await getAllDepartments(token);
                dispatch(setDepartmentData(depData))
                dispatch(hideLoading())
            })();
        } catch (error) {
        }
    }, []);

    // Handle Delete Department
    const handleDelete = async (depId) => {
        try {
            const result = await deleteDepartment(depId, token);
            if (result.deleted) {
                dispatch(deleteDepartmentData(depId))
                toast.success('Deleted Successfully...!', {
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
                toast.error('Internal Server Error...!', {
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
            toast.error('Not Deleted Please Try Again....!', {
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

    // Handle Edit Department
    const handleEdit = (depId, department) => {
        document.getElementById('deptUpdateValue').value = department
        document.getElementById('deptUpdateID').value = depId
    }

    const handleDeptUpdate = async () => {
        try {
            let deptID = document.getElementById('deptUpdateID').value;
            const res = await updateDepartment(deptID, updatedeptValue, token)
            if (res.updated) {
                toast.success(res.message, {
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
                setTimeout(() => {
                    location.reload();
                }, 1000)
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
            toast.error('Not Updated Please Try Again....!', {
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

    // departmentDetails.forEach((photo, index) => { photo.serial = index + 1; });
    // Data Table Customization
    const column = [
        {
            name: '#',
            selector: 'serial'
        },
        {
            name: "Department",
            selector: row => row?.department,
            sortable: true
        },
        {
            name: "Action",
            cell: (row) => ([<button className='btn editBtn' data-bs-toggle="modal" data-bs-target="#updateDepartment" onClick={() => handleEdit(row?._id, row?.department)}><i class="las la-edit"></i></button>,
            <button className='btn deleteBtn' onClick={() => handleDelete(row?._id)}><i class="las la-trash"></i></button>])
        }
    ]
    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            {loading && <div class="d-flex justify-content-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>}
            {!loading &&

                <DataTable
                    // title="Department List"
                    columns={column}
                    data={departmentDetails}
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight='300px'
                    selectableRows
                    selectableRowsHighlight
                    highlightOnHover
                    // actions={<button className='btn btn-sm btn-info'>Export</button>}
                    subHeader
                    subHeaderComponent={
                        [<input type="text"
                            placeholder="Search By Department"
                            className='w-25 form-control'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)} />,
                        <button className='btn btn-sm btn-info ms-3'>Export</button>
                        ]
                    }
                    subHeaderAlign="left"
                />
            }

            <div className="modal_body">
                <div class="modal fade" id="updateDepartment" tabindex="-1" aria-labelledby="updateDepartment" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 className='modal-title'>Update Department</h5>
                                <button type="button" class="btn btn-secondary close" data-bs-dismiss="modal">
                                    <span>x</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label>Department Name</label>
                                            <input type="text" className='form-control' id='deptUpdateValue' value={updatedeptValue} onChange={e => setUpdateDeptValue(e.target.value)} />
                                            <input type="text" className='form-control' id='deptUpdateID' style={{ display: 'none' }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="submit-section">
                                    <button className='btn btn-primary submit-btn' type='submit' onClick={handleDeptUpdate}>Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Departmentlist