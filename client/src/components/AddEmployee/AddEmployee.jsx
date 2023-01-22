import React from 'react'
import AddForm from './AddForm'
import PageHeader from './PageHeader'
import './Style.css'

function AddEmployee() {
  return (
    <div class="section-body form-content">
      <PageHeader />
      <AddForm />
    </div>
  )
}

export default AddEmployee