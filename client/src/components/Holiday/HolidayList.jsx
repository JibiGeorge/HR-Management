import React, { useEffect } from 'react'
import { useState } from 'react'
import DataTable from 'react-data-table-component'
import { useDispatch, useSelector } from 'react-redux'
import { getAllHolidays } from '../../helper/HolidayHelper'
import { hideLoading, showLoading } from '../../redux/features/alertSlice'
import { setHolidaysDetails } from '../../redux/features/holidaySlice'
import DeleteConfirmation from './DeleteConfirmation'
import EditHoliday from './EditHoliday'

const HolidayList = () => {
    const { loading } = useSelector(state => state.alerts);
    const { holidays } = useSelector(state => state.holiday);
    const {userDetails} = useSelector(state => state.user);
    const token = userDetails.UserToken;

    const [id,setId]= useState('')
    const [deleteModal, setDeleteModal] = useState(false)
    const [updateModal, setUpdateModal] = useState(false)

    const dispatch = useDispatch();

    useEffect(() => {
        try {
            (async () => {
                dispatch(showLoading());
                const data = await getAllHolidays(token);
                if(data.success){
                    for(let i=0;i<data.result.length;i++){
                        data.result[i].startDate = new Date(data.result[i].startDate).toISOString().slice(0,10)
                    }
                    for(let i=0;i<data.result.length;i++){
                        data.result[i].endDate = new Date(data.result[i].endDate).toISOString().slice(0,10)
                    }
                    dispatch(setHolidaysDetails(data.result))
                    dispatch(hideLoading())
                }else{
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
                    dispatch(hideLoading())
                }
            })()
        } catch (error) {
            toast.error('Something Went wrong..!', {
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
    }, [])

    const column = [
        {
            name: 'Name of the Holiday',
            selector: row => row.nameOfTheHoliday
        },
        {
            name: 'Start Date',
            selector: row => row.startDate
        },
        {
            name: 'End Date',
            selector: row => row.endDate
        },
        {
            name: 'Total Days',
            selector: row => row.total
        },
        {
            name: "Action",
            cell: (row) => ([<button className='btn editBtn' onClick={() => handleEdit(row._id)}><i class="las la-edit"></i></button>,
            <button className='btn deleteBtn' onClick={() => handleDelete(row._id)} ><i class="las la-trash"></i></button>])
        }
    ]

    const deleteCloseModal = (()=> setDeleteModal(false))
    const updateCloseModal = (()=> setUpdateModal(false))
    const handleDelete = (id)=>{
        setId(id)
        setDeleteModal(true)
    }

    const handleEdit = (id) =>{
        setId(id)
        setUpdateModal(true)
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
                    data={holidays}
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

                {deleteModal && <DeleteConfirmation id={id} closeModal={deleteCloseModal} /> }
                {updateModal && <EditHoliday id={id} closeModal={updateCloseModal} /> }
        </>
    )
}

export default HolidayList