import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { getAllDepartments } from '../../helper/Departmenthelper.js'
import DataTable from 'react-data-table-component';

function Departmentlist() {
    const [department, setDepartment] = useState([])
    const [search, setSearch] = useState('')
    const [filteredDepartments, setfilteredDepartments] = useState([])

    // Geting all Department Details from Database
    useEffect(() => {
        try {
            (async () => {
                const depData = await getAllDepartments();
                setDepartment(depData)
                setfilteredDepartments(depData)
            })();
        } catch (error) {
            console.log("Server Error...!");
        }
    }, []);

    // Searching in Department
    useEffect(()=>{
        try {
            const result = department.filter((response)=>{
                return response.department.toLowerCase().match(search.toLowerCase());
            })
            console.log(result);
            setfilteredDepartments(result)
        } catch (error) {
            console.log("Server Error",error.message);            
        }
    },[search]);

    // Data Table Customization
    const column = [
        {
            name: "SL No.",
            selector: row => row.department,
            sortable: true
        },
        {
            name: "Department",
            selector: row => row.department,
            sortable: true
        },
        {
            name: "Action",
            cell: (row) => ([<button className='btn btn-primary me-2' onClick={()=> alert(row._id)} > Edit</button>,
            <button className='btn btn-primary' onClick={()=> alert(row._id)} > Delete</button>])
        }
    ]
    return (
        <DataTable
        title="Department List"
        columns={column}
        data={filteredDepartments}
        pagination
        fixedHeader
        fixedHeaderScrollHeight='300px'
        selectableRows
        selectableRowsHighlight
        highlightOnHover
        actions={<button className='btn btn-sm btn-info'>Export</button>}
        subHeader
        subHeaderComponent={
            <input type="text"
            placeholder="Search Here"
            className='w-25 form-control'
            value={search}
            onChange={(e)=> setSearch(e.target.value)}/>
        }
        subHeaderAlign="left"
        />        
    )
}

export default Departmentlist