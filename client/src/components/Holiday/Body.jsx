import React from 'react'
import HolidayList from './HolidayList'
import PageHeader from './PageHeader'

const Body = () => {
  return (
    <div className="section-body">
        <PageHeader/>
        <HolidayList/>
    </div>
  )
}

export default Body