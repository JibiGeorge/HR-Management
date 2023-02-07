import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { useDispatch, useSelector } from 'react-redux'
import { getAllLeaveTypes } from '../../helper/LeaveTypeHelper'
import { hideLoading, showLoading } from '../../redux/features/alertSlice'
import { setLeaveTypes } from '../../redux/features/leaveTypeSlice'
import DeleteConfirmation from './DeleteConfirmation'
import EditForm from './EditForm'

const List = () => {
    const { leaveType } = useSelector(state => state.leaveType);
    const { loading } = useSelector(state => state.alerts);
    const {userDetails} = useSelector(state => state.user);

    const token = userDetails.UserToken;

    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            dispatch(showLoading())
            try {
                const leaveTypes = await getAllLeaveTypes(token);
                if (leaveTypes.success) {
                    dispatch(setLeaveTypes(leaveTypes.allLeaveTypes))
                    dispatch(hideLoading())
                } else {
                    toast.error(leaveTypes.message, {
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
                dispatch(hideLoading())
            }
        })()
    }, [])

    const [id, setId] = useState('')
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false)
    const closeDeleteModal = () => setShowDeleteConfirmModal(false)

    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const closeUpdateModal = () => setShowUpdateModal(false)

    const handleDelete = (id) => {
        setId(id)
        setShowDeleteConfirmModal(true)
    }

    const handleEdit = (id) => {
        setId(id)
        setShowUpdateModal(true)
    }

    const column = [
        {
            name: 'Leave Type',
            selector: row => row.leaveType
        },
        {
            name: "Action",
            cell: (row) => ([<button className='btn editBtn' onClick={() => handleEdit(row._id)}><i class="las la-edit"></i></button>,
            <button className='btn deleteBtn' onClick={() => handleDelete(row._id)}><i class="las la-trash"></i></button>])
        }
    ]
    return (
        <>
            {loading && <div class="d-flex justify-content-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>}
            {!loading &&
                <DataTable
                    columns={column}
                    data={leaveType}
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight='300px'
                    highlightOnHover
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

            {showDeleteConfirmModal && <DeleteConfirmation closeModal={closeDeleteModal} id={id} />}
            {showUpdateModal && <EditForm closeModal={closeUpdateModal} id={id} />}
        </>
    )
}

export default List