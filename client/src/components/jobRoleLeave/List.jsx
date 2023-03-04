import React, { useEffect, useState } from 'react'
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
    const {userDetails} = useSelector(state => state.user);
    const token = userDetails.UserToken;

    useEffect(() => {
        dispatch(showLoading());
        (async () => {
            try {
                const jobRoleLeaves = await getAllJobRolesLeavesData(token);
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

    const [filteredData, setFilteredData] = useState(jobRoleLeaves);

    const search = (e)=>{
        const inputData = e.target.value;
        const searchedData = jobRoleLeaves.filter((values)=>{
            return values.leaveType?.leaveType.toLowerCase().includes(inputData.toLowerCase());
        })
        setFilteredData(searchedData);
    }
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
                            placeholder="Search By Leave Type"
                            className='w-25 form-control' onChange={search} />,
                        <button className='btn btn-sm btn-info ms-3'>Export</button>
                        ]
                    }
                    subHeaderAlign="left"
                />}


        </>
    )
}

export default List