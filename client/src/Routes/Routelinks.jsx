import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AllLeaveApplications from '../pages/AllLeaveApplications'
import AssetCategory from '../pages/AssetCategory'
import Assets from '../pages/Assets'
import Attendance from '../pages/Attendance'
import Dashboard from '../pages/Dashboard'
import Department from '../pages/Department'
import Designation from '../pages/Designation'
import Employee from '../pages/Employee'
import Employeeadd from '../pages/Employeeadd'
import EmployeeDetails from '../pages/EmployeeDetails'
import Holiday from '../pages/Holiday'
import JobRoleLeave from '../pages/JobRoleLeave'
import LeaveApplication from '../pages/LeaveApplication'
import LeaveType from '../pages/LeaveType'
import Login from '../pages/Loginpage'
import Protect from '../protectorRoute/Protect'
import Container from './Container'

function Routelinks() {
    return (
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path='/*' element={<Container/>} />
                
            </Routes>
    )
}

export default Routelinks