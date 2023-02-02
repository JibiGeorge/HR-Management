import React from 'react'
import { useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { toast, Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { attendanceList } from '../../helper/AttendanceHelper'
import { setAllAttendance } from '../../redux/features/attendanceSlice'

const List = () => {
  const { loading } = useSelector(state => state.alerts)
  const {attendance} = useSelector( state => state.attendance)
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      try {
        const attendance = await attendanceList()
        console.log(attendance);
        if (attendance.success) {
          dispatch(setAllAttendance(attendance.data))          
        } else {
          toast.error(attendance.message, {
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
        console.log(error.message);
        toast.error('Something Wrong', {
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
    })()
  }, [])

  const column = [
    {
      name: 'Employee Name',
      selector: row => row.employee.username
    },
    {
      name: 'Sign In',
      selector: row => row.signIn
    },
    {
      name: 'Sign Out',
      selector: row => row.signOut
    },
    {
      name: 'Total Time',
      selector: row => row.totalTime
    },
    {
      name: "Action",
      cell: (row) => ([<button className='btn editBtn'><i class="las la-edit"></i></button>,
      <button className='btn deleteBtn' ><i class="las la-trash"></i></button>])
    }
  ]
  return (
    <>
      <Toaster
        position='top-right'
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
          data={attendance}
          pagination
          fixedHeader
          fixedHeaderScrollHeight='300px'
          selectableRows
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

export default List