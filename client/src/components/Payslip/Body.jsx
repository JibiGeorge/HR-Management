import React from 'react'
import Filter from './Filter'
import PageHeader from './PageHeader'
import './Payslip.css'

const Body = () => {
    return (
        <div className='section-body'>
            <PageHeader />
            <Filter />
        </div>
    )
}

export default Body