import React, { useEffect } from 'react'
import { useState } from 'react'
import { deleteDepartment, getAllDepartments, updateDepartment } from '../../helper/Departmenthelper.js'
import DataTable from 'react-data-table-component';
import toast, { Toaster } from 'react-hot-toast';

function Departmentlist() {
    const [department, setDepartment] = useState([])
    const [search, setSearch] = useState('')
    const [filteredDepartments, setfilteredDepartments] = useState([]);
    const [loading, setLoading] = useState(false)
    const [updatedeptValue, setUpdateDeptValue] = useState('');

    // Geting all Department Details from Database
    useEffect(() => {
        try {
            (async () => {
                setLoading(true)
                const depData = await getAllDepartments();
                setTimeout(() => {
                    setDepartment(depData)
                    setfilteredDepartments(depData)
                    setLoading(false)
                }, 1000)
            })();
        } catch (error) {
            console.log("Server Error...!");
        }
    }, []);

    // Searching in Department
    useEffect(() => {
        try {
            const result = department.filter((response) => {
                return response.department.toLowerCase().match(search.toLowerCase());
            })
            setfilteredDepartments(result)
        } catch (error) {
            console.log("Server Error", error.message);
        }
    }, [search]);



    // Handle Delete Department
    const handleDelete = async (depId) => {
        const result = await deleteDepartment(depId);
        if (result.deleted) {
            toast.success('Deleted Successfully...!', {
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
            location.reload()
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
    }

    // Handle Edit Department
    const handleEdit = (depId, department) => {
        console.log('vcdv', depId, department)
        document.getElementById('deptUpdateValue').value = department
        document.getElementById('deptUpdateID').value = depId
    }

    const handleDeptUpdate = async () =>{
        try {
            let deptID = document.getElementById('deptUpdateID').value;
            const res = await updateDepartment(deptID,updatedeptValue)
            if(res.updated){
                toast.success(res.message, {
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
                setTimeout(()=>{
                    location.reload();
                },1000)
            }else{
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
            
        }
    }

    filteredDepartments.forEach((photo, index) => { photo.serial = index + 1; });
    // Data Table Customization
    const column = [
        {
            name: '#',
            selector: 'serial'
          },
        {
            name: "Department",
            selector: row => row.department,
            sortable: true
        },
        {
            name: "Action",
            cell: (row) => ([<button className='btn btn-primary me-2 editBtn' data-bs-toggle="modal" data-bs-target="#updateDepartment" onClick={() => handleEdit(row._id, row.department)}>Edit</button>,
            <button className='btn btn-danger deleteBtn' onClick={() => handleDelete(row._id)}>Delete</button>])
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
                    data={filteredDepartments}
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
                                            <input type="text" className='form-control' id='deptUpdateValue' value={updatedeptValue} onChange={e=> setUpdateDeptValue(e.target.value)} />
                                            <input type="text" className='form-control' id='deptUpdateID' style={{display:'none'}} />
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