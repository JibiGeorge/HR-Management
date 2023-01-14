import React from 'react'
import './Style.css'

function PageHeader() {
  return (
    <div className="pageHeader">
      <div className="row">
        <div className="col-sm-9">
          <h3 className='page-title'>Department</h3>
          <p>Dashboard / Department</p>
        </div>
        <div className="col-sm-3">
          <button type="button" class="btn btn-primary add-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <i className="fa fa-plus"></i>
            Add Department
          </button>
        </div>
      </div>

      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 className='modal-title'>Add Department</h5>
              <button type="button" class="btn btn-secondary close" data-bs-dismiss="modal">
                <span>x</span>
                </button>                
            </div>
            <div class="modal-body">
              <form action="#">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label>Department Name</label>
                      <input type="text" className='form-control' />
                    </div>
                  </div>
                </div>
                <div className="submit-section">
                  <button className='btn btn-primary submit-btn'>Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageHeader