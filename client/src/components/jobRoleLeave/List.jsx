import React, { useEffect } from 'react'
import DataTable from 'react-data-table-component';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { getAllJobRolesLeavesData } from '../../helper/JobRoleLeaves';
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
import { setJobRoleLeaves } from '../../redux/features/jobRoleLeavesSlice';

const List = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.alerts);
    const { jobRoleLeaves } = useSelector(state => state.jobRoleLeaves);
    useEffect(() => {
        dispatch(showLoading());
        (async () => {
            try {
                const jobRoleLeaves = await getAllJobRolesLeavesData();
                if (jobRoleLeaves.success) {
                    dispatch(setJobRoleLeaves(jobRoleLeaves.data));
                    dispatch(hideLoading());
                } else {
                    toast.error(jobRoleLeaves.message, {
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
                toast.error('Some Error Occurs..!', {
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
    console.log('des',jobRoleLeaves);

    const column = [
        {
            name : 'Designation',
            selector: row => row.designation?.designation
        },
        {
            name : 'Leave Type',
            selector: row => row.leaveType?.leaveType
        },
        {
            name : 'Days',
            selector: row => row?.days
        },
        {
            name: 'Action',
            cell: (row) => ([<button className='btn editBtn'><i class="las la-edit"></i></button>,
            <button className='btn deleteBtn' ><i class="las la-trash"></i></button>])
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
                    data={jobRoleLeaves}
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
                            className='w-25 form-control' />,
                        <button className='btn btn-sm btn-info ms-3'>Export</button>
                        ]
                    }
                    subHeaderAlign="left"
                />}


        </>
    )
}

export default List