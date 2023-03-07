import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
import { deleteDesignation, getAllDesignation } from '../../helper/Designationhelper';
import { getAllDepartments } from '../../helper/Departmenthelper';
import { deleteDesigntionData, setDesignatonData } from '../../redux/features/designationSlice';
import EditDesignation from './EditDesignation';
import { setDepartmentData } from '../../redux/features/departmentSlice';

function Designationlist() {
    const dispatch = useDispatch();

    const { userDetails } = useSelector(state => state.user);
    const { loading } = useSelector(state => state.alerts);
    const { designationDetails } = useSelector(state => state.designation);

    const [filteredData, setFilteredData] = useState(designationDetails)

    const token = userDetails.UserToken;

    useEffect(() => {
        (async () => {
            try {
                dispatch(showLoading());
                const data = await getAllDesignation(token)
                if (data.success) {
                    dispatch(setDesignatonData(data.data));
                    dispatch(hideLoading());
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
                    dispatch(hideLoading());
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
                dispatch(hideLoading());
            }
        })();
    }, []);

    useEffect(() => {
        setFilteredData(designationDetails);
    }, [designationDetails]);

    const [editDesignationModal, setEditDesignationModal] = useState(false);
    const closeEditDesignationModal = () => setEditDesignationModal(false);
    const initialValues = {
        docID: '',
        designation: '',
        departmentID: ''
    }
    const [updatingData, setUpdatingData] = useState(initialValues);

    //Designation Data Edit
    const handleEdit = (docId, designationName, departmentId) => {
        setUpdatingData({ ...updatingData, docID: docId, designation: designationName, departmentID: departmentId });
        setEditDesignationModal(updatingData);
    }

    //   Data Tables
    const column = [
        {
            name: "Designation",
            selector: row => row?.designation,
            sortable: true
        },
        {
            name: "Department",
            selector: row => row.departmentId?.department,
            sortable: true
        },
        {
            name: "Action",
            cell: (row) => ([<button className='btn editBtn' onClick={() => handleEdit(row?._id, row?.designation, row.departmentId?._id)}><i class="las la-edit"></i></button>,
            <button className='btn deleteBtn' onClick={() => handleDelete(row._id)}><i class="las la-trash"></i></button>])
        }
    ]

    // Designation Data Delete
    const handleDelete = async (id) => {
        try {
            const result = await deleteDesignation(id, token);
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

    useEffect(() => {
        try {
            (async () => {
                try {
                    const departmentData = await getAllDepartments(token);
                    dispatch(setDepartmentData(departmentData))
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

    const search = (e) => {
        const inputData = e.target.value;
        const searchedData = designationDetails.filter((values) => {
            return values.designation.toLowerCase().includes(inputData.toLowerCase());
        })
        setFilteredData(searchedData);
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
                            placeholder="Search By Designation"
                            className='w-25 form-control'
                            onChange={search} />,
                        ]
                    }
                    subHeaderAlign="left"
                />
            }

            {editDesignationModal && <EditDesignation updatingData={updatingData} closeEditDesignationModal={closeEditDesignationModal} />}

        </>
    )
}

export default Designationlist