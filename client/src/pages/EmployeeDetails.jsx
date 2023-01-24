import React from 'react'
import Header from '../components/header/Header'
import Sidebar from '../Components/Sidebar/Sidebar'
import Employee from '../Components/EmployeeDetails/Body'

function EmployeeDetails() {
    return (
        <>
            <Sidebar />
            <Header />
            <Employee/>
        </>
    )
}

export default EmployeeDetails