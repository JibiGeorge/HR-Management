import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Department from '../pages/Department'
import Designation from '../pages/Designation'
import Login from '../pages/Loginpage'

function Routelinks() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route exact path='/department' element={<Department/>}/>
                <Route exact path='/designation' element={<Designation/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Routelinks