import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import AddCategory from './AddCategory'

const PageHeader = () => {
    return (
        <div className="pageHeader">
            <div><Toaster position="top-right" reverseOrder={false} /></div>
            <div className="row">
                <div className="col-sm-9">
                    <h3 className='page-title'>Assets Category</h3>
                    <p>Dashboard / Assets / Category</p>
                </div>
                <div className="col-sm-3">
                    <button type="button" class="btn btn-primary add-btn" data-bs-toggle="modal" data-bs-target="#assetsCategoryAdd">
                        <i className="fa fa-plus"></i>Add Category</button>
                </div>
            </div>
            <AddCategory/>
        </div>
    )
}

export default PageHeader