import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import LeaveType from '../pages/LeaveType'
import Login from '../pages/Loginpage'
import Protect from '../protectorRoute/Protect'

function Routelinks() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route element={<Protect />}>
                    <Route exact path="/dashboard" element={<Dashboard />} />
                    <Route exact path='/department' element={<Department />} />
                    <Route exact path='/designation' element={<Designation />} />
                    <Route exact path='/employee' element={<Employee />} />
                    <Route exact path='/addEmployee' element={<Employeeadd />} />
                    <Route exact path='/employeeDetails' element={<EmployeeDetails />} />
                    <Route exact path='/assetsCategory' element={<AssetCategory />} />
                    <Route exact path='/assets' element={<Assets />} />
                    <Route exact path='/holiday' element={<Holiday />} />
                    <Route exact path='/leave' element={<LeaveType />} />
                    <Route exact path='/attendance' element={<Attendance />} />
                    <Route exact path='/leave/jobRole' element={<JobRoleLeave/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Routelinks