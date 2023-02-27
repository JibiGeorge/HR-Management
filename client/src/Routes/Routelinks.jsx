import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Loginpage'
import PageNotFound from '../pages/PageNotFound'
import Container from './Container'

function Routelinks() {
    return (
        <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path='/hr/*' element={<Container />} />
            <Route path='*' element={<PageNotFound />} />
        </Routes>
    )
}

export default Routelinks