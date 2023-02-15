import React from 'react'
import Employee from '../Components/EmployeeDetails/Body'
import { Toaster } from 'react-hot-toast'

function EmployeeDetails() {
    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <Employee />
        </>
    )
}

export default EmployeeDetails