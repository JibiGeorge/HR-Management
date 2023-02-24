import React from 'react'
import PageHeader from './PageHeader'
import PayrolGeneratedList from './PayrolGeneratedList'
import './Payrol.css'
import PaidPayrolList from './PaidPayrolList'

const Body = () => {
  return (
    <div className="section-body">
        <PageHeader/>
        <PayrolGeneratedList/>
        <PaidPayrolList/>
    </div>
  )
}

export default Body