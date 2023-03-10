import React, { useEffect } from 'react'
import { useState } from 'react'
import { deleteDepartment, getAllDepartments } from '../../helper/Departmenthelper.js'
import DataTable from 'react-data-table-component';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/features/alertSlice';
import { setDepartmentData, deleteDepartmentData } from '../../redux/features/departmentSlice.js';
import EditDepartment from './EditDepartment.jsx';

function Departmentlist() {
    const [updatedeptValue, setUpdateDeptValue] = useState('');
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.alerts);
    const { departmentDetails } = useSelector(state => state.department);
    const { userDetails } = useSelector(state => state.user);

    const [departmentEditModal, setDepartmentEditModal] = useState(false);
    const closeDepartmentEditModal = () => setDepartmentEditModal(false);
    const [departmentId, setDepartmentId] = useState('');
    const [filteredData, setFilteredData] = useState(departmentDetails);

    const token = userDetails.UserToken;

    // Geting all Department Details from Database
    useEffect(() => {
        dispatch(showLoading());
        (async () => {
            try {
                const depData = await getAllDepartments(token);
                dispatch(setDepartmentData(depData));
                dispatch(hideLoading())
            } catch (error) {
                dispatch(hideLoading())
            }
        })();
    }, []);

    useEffect(() => {
        setFilteredData(departmentDetails);
    }, [departmentDetails]);

    // Handle Delete Department
    const handleDelete = async (depId) => {
        try {
            const result = await deleteDepartment(depId, token);
            if (result.deleted) {
                dispatch(deleteDepartmentData(depId));  // After deleting the department the deleted department id data will check and remove from the redux
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
        setDepartmentId(depId);
        setDepartmentEditModal(true)
        setUpdateDeptValue(department);
    }

    // Search or Filter
    const search = (e) => {
        const inputData = e.target.value;
        const searchedData = departmentDetails?.filter((values) => {
            return values.department.toLowerCase().includes(inputData.toLowerCase());
        })
        setFilteredData(searchedData);
    }

    // Data Table Customization
    const column = [
        {
            name: "Department",
            selector: row => row?.department,
            sortable: true
        },
        {
            name: "Action",
            cell: (row) => ([<button className='btn editBtn' onClick={() => handleEdit(row?._id, row?.department)}><i class="las la-edit"></i></button>,
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
                    columns={column}
                    data={filteredData}
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight='300px'
                    selectableRows
                    selectableRowsHighlight
                    highlightOnHover
                    subHeader
                    subHeaderComponent={
                        [<input type="text"
                            placeholder="Search By Department"
                            className='w-25 form-control'
                            onChange={search} />
                        ]
                    }
                    subHeaderAlign="left"
                />
            }

            {departmentEditModal && <EditDepartment departmentId={departmentId} closeDepartmentEditModal={closeDepartmentEditModal} updatedeptValue={updatedeptValue} />}
        </>
    )
}

export default Departmentlist