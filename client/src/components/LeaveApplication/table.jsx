import React, { useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { useSelector } from 'react-redux'

const column = [
    {
        name: 'Leave Type',
        selector: row => row?.leaveType?.leaveType
    },
    {
        name: 'Apply Date',
        selector: row => row?.applyDate
    },
    {
        name: 'From Date',
        selector: row => row?.fromDate
    },
    {
        name: 'To Days',
        selector: row => row?.toDate
    },
    {
        name: 'Total Days',
        selector: row => row?.days
    },
    {
        name: 'Mode Of Leave',
        selector: row => row?.modeOfLeave
    },
    {
        name: 'Status',
        selector: row => row?.status
    },
    {
        name: "Action",
        cell: (row) => ([<button className='btn editBtn'><i class="las la-edit"></i></button>,
        <button className='btn deleteBtn'><i class="las la-trash"></i></button>])
    }
]
const table = ({ applications }) => {
    const { loading } = useSelector(state => state.alerts);
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
                    data={applications?.leaveApplications}
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight='300px'
                    selectableRowsHighlight
                    highlightOnHover
                    subHeader
                    subHeaderComponent={
                        [<input type='text'
                            placeHolder='Search By Category'
                            className='w-25 form-control' />,
                        <button className='btn btn-sm btn-info ms-3'>Export</button>]
                    }
                    subHeaderAlign='left'
                />}
        </>
    )
}

export default table