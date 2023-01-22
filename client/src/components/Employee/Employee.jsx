import React from 'react'
import Filter from './Filter'
import PageHeader from './Header'
import './Employee.css'
import Cards from './Cards'

function Employee() {
  return (
    <div class="section-body employee">
      <PageHeader />
      <Filter />
      <Cards />
    </div>
  )
}

export default Employee