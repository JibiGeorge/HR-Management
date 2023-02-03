import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { toast, Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { attendanceList } from '../../helper/AttendanceHelper'
import { setAllAttendance } from '../../redux/features/attendanceSlice'
import DeleteConfirmation from './DeleteConfirmation'
import EditForm from './EditForm'

const List = () => {
  const { loading } = useSelector(state => state.alerts)
  const {attendance} = useSelector( state => state.attendance)
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      try {
        const attendance = await attendanceList()
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

  const [attendanceDeleteModal, setAttendanceDeleteModal] = useState(false);
  const [attendanceUpdateModal, setAttendanceUpdateModal] = useState(false)
  const [id, setId] = useState('')
  const closeDeleteModal = () => setAttendanceDeleteModal(false)
  const closeUpdateModal = () => setAttendanceUpdateModal(false)

  const handleDelete = (id)=>{
    setId(id)
    setAttendanceDeleteModal(true)
  }

  const handleUpdate = (id)=>{
    setId(id)
    setAttendanceUpdateModal(true)
  }

  const column = [
    {
      name: 'Employee Name',
      selector: row => row.employee?.username
    },
    {
      name: 'Date',
      selector: row => row?.date
    },
    {
      name: 'Sign In',
      selector: row => row?.signIn
    },
    {
      name: 'Sign Out',
      selector: row => row?.signOut
    },
    {
      name: 'Total Time',
      selector: row => row?.totalTime
    },
    {
      name: "Action",
      cell: (row) => ([<button className='btn editBtn' onClick={()=> handleUpdate(row._id)}><i class="las la-edit"></i></button>,
      <button className='btn deleteBtn' onClick={()=> handleDelete(row._id)} ><i class="las la-trash"></i></button>])
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

        {attendanceDeleteModal && <DeleteConfirmation closeModal={closeDeleteModal} id={id} /> }
        {attendanceUpdateModal && <EditForm closeModal={closeUpdateModal} id={id} /> }
    </>
  )
}

export default List