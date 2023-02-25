import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Loginpage'
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