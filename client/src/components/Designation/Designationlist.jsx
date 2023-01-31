import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
import { deleteDesignation, getAllDesignation, updateDesignation } from '../../helper/Designationhelper';
import { getAllDepartments } from '../../helper/Departmenthelper';
import { deleteDesigntionData, setDesignatonData } from '../../redux/features/designationSlice';

function Designationlist() {
    const dispatch = useDispatch();
    const [designation, setDesignation] = useState([]);
    const [filteredDesignation, setFilteredDesignation] = useState([])
    const [department, setDepartment] = useState([])

    const { loading } = useSelector(state => state.alerts);
    const { designationDetails } = useSelector(state => state.designation)

    useEffect(() => {
        (async () => {
            try {
                dispatch(showLoading());
                const data = await getAllDesignation()
                if (data.success) {
                    dispatch(setDesignatonData(data));
                    setDesignation(data.data);
                    setFilteredDesignation(data.data);
                    dispatch(hideLoading());
                } else {
                    toast.error('Internal Server Error....!', {
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
                toast.error('Internal Server Error....!', {
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

    // designationDetails.forEach((photo, index) => { photo.serial = index + 1; });
    //   Data Tables
    const column = [
        {
            name: '#',
            selector: 'serial'
        },
        {
            name: "Designation",
            selector: row => row.designation,
            sortable: true
        },
        {
            name: "Department",
            selector: row => row.departmentId.department,
            sortable: true
        },
        {
            name: "Action",
            cell: (row) => ([<button className='btn editBtn' data-bs-toggle="modal" data-bs-target="#updateDepartment" onClick={() => handleEdit(row._id, row.designation)}><i class="las la-edit"></i></button>,
            <button className='btn deleteBtn' onClick={() => handleDelete(row._id)}><i class="las la-trash"></i></button>])
        }
    ]

    // Designation Data Delete
    const handleDelete = async (id) => {
        try {
            const result = await deleteDesignation(id);
            if (result.data.success) {
                dispatch(deleteDesigntionData(id))
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
            } else {
                toast.error('Internal Server Error....!', {
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

    //Designation Data Edit
    const handleEdit = (id, designation) => {
        document.getElementById('desiUpdateValue').value = designation
        document.getElementById('desiUpdateID').value = id
    }

    useEffect(() => {
        try {
            (async () => {
                try {
                    const departmentData = await getAllDepartments();
                    setDepartment(departmentData)
                } catch (error) {
                    toast.error('Internal Server Error....!', {
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
        } catch (error) {
            toast.error('Internal Server Error....!', {
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
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        // try {
        //     (async()=>{
        //         // const result = await updateDesignation(updatingData);
        //     })();
        // } catch (error) {
        //     toast.error('Not Updated....!', {
        //         style: {
        //             border: '1px solid #713200',
        //             padding: '16px',
        //             color: '#713200',
        //         },
        //         iconTheme: {
        //             primary: '#713200',
        //             secondary: '#FFFAEE',
        //         },
        //     });      
        // }
    }
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
                    data={designationDetails}
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
                            className='w-25 form-control' />,
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
                                <h5 className='modal-title'>Update Designation</h5>
                                <button type="button" class="btn btn-secondary close" data-bs-dismiss="modal">
                                    <span>x</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label>Department Name*</label>
                                            <select className='form-select' aria-label='Default select example'>
                                                <option value="" selected>Select A Department</option>
                                                {department.map(data => {
                                                    return (
                                                        <option value={data._id}>{data.department}</option>
                                                    )
                                                })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label>Designation Name</label>
                                            <input type="text" className='form-control' id='desiUpdateValue' />
                                            <input type="text" className='form-control' id='desiUpdateID' style={{ display: 'none' }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="submit-section">
                                    <button className='btn btn-primary submit-btn' type='submit' onClick={handleUpdate}>Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Designationlist