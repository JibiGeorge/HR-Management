import React from 'react'
import PageHeader from './PageHeader'
import './Notice.css'
import Table from './Table'

const Body = () => {
    return (
        <div className="section-body">
            <PageHeader />
            <Table/>
        </div>
    )
}

export default Body