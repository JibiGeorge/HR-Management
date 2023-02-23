import React from 'react'
import DataTable from 'react-data-table-component';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { getAllLeaveApplications, updateLeaveStatus } from '../../helper/LeaveApplication';
import { setAllEmployeeLeaveApplications } from '../../redux/features/leaveApplicationsSlice';

const ApplicationsList = ({ applications }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.alerts);
  const { userDetails } = useSelector(state => state.user);
  const token = userDetails.UserToken;

  const handleStatus = async ({ status, docID, applicationsID, empID }) => {
    try {
      const update = await updateLeaveStatus(status, docID, applicationsID, token, empID)
      if (update.success) {
        const allLeaveApplications = await getAllLeaveApplications(token)
        toast.success(update.message, {
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
        dispatch(setAllEmployeeLeaveApplications(allLeaveApplications?.applications));
      } else {
        toast.error(update.message, {
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
      toast.error('Not Updated..!', {
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
      name: 'Employee Name',
      selector: row => row.employeeDetails[0]?.firstName + ' ' + row.employeeDetails[0]?.lastName
    },
    {
      name: 'Apply Date',
      selector: row => new Date(row.leaveApplications?.applyDate).toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric'
      })
    },
    {
      name: 'From Date',
      selector: row => new Date(row.leaveApplications?.fromDate).toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric'
      })
    },
    {
      name: 'To Date',
      selector: row => new Date(row.leaveApplications?.toDate).toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric'
      })
    },
    {
      name: 'Total Days',
      selector: row => row.leaveApplications?.days
    },
    {
      name: 'Mode Of Leave',
      selector: row => row.leaveApplications?.modeOfLeave
    },
    {
      name: 'Status',
      selector: row => row.leaveApplications?.status
    },
    {
      name: "Action",
      cell: (row) => ([<div class="dropdown">
        <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Status
        </button>

        <ul class="dropdown-menu">
          <li><button class="dropdown-item" onClick={() => handleStatus({ status: 'Approved', docID: row._id, applicationsID: row.leaveApplications?._id, empID: row.employeeDetails[0]._id })}>Approved</button></li>
          <li><button class="dropdown-item" onClick={() => handleStatus({ status: 'Cancelled', docID: row._id, applicationsID: row.leaveApplications?._id, empID: row.employeeDetails[0]._id })}>Cancelled</button></li>
          <li><button class="dropdown-item" onClick={() => handleStatus({ status: 'Pending', docID: row._id, applicationsID: row.leaveApplications?._id, empID: row.employeeDetails[0]._id })}>Pending</button></li>
        </ul>
      </div>])
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
          data={applications}
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
        />
      }
    </>
  )
}

export default ApplicationsList