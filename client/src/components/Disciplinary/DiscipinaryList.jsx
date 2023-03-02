import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { useSelector } from 'react-redux'
import DeleteConfirmation from './DeleteConfirmation';

const DiscipinaryList = () => {
    const {disciplinaryData} = useSelector(state => state.disciplinary);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const closeDeleteModal =()=> setShowDeleteModal(false);
    const [deleteDocID, setDeleteDocID]= useState(null);
    const handleDelete = (id)=>{
        setDeleteDocID(id);
        setShowDeleteModal(true);
    }
    const column = [
        {
            name: "Employee",
            selector: row => [row.employeeId?.firstName,' ', row.employeeId?.lastName]
        },
        {
            name: "Emp Code",
            selector: row => row.employeeId?.empCode
        },
        {
            name: "Department",
            selector: row => row.department?.department
        },
        {
            name: "Designation",
            selector: row => row.designation?.designation
        },
        {
            name: "Status",
            selector: row => row?.disciplinaryAction
        },
        {
            name: "Title",
            selector: row => row?.title
        },
        {
            name: "Action",
            cell: (row) => (<button className='btn deleteBtn' onClick={() => handleDelete(row._id)} ><i class="las la-trash"></i></button>)
        }
    ]
    return (
        <>
            <DataTable
            columns={column}
            data={disciplinaryData}
                pagination
                fixedHeader
                fixedHeaderScrollHeight='400px'
                selectableRowsHighlight
                highlightOnHover />
                {showDeleteModal && <DeleteConfirmation closeDeleteModal={closeDeleteModal} docID={deleteDocID} />}
        </>
    )
}

export default DiscipinaryList