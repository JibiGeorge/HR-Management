import React, { useState } from 'react'
import './Style.css'
import { useFormik } from 'formik'
import { addDepartment } from '../../helper/Departmenthelper';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function PageHeader() {

  const [department, setDepartment] = useState('');


  const handleDepartmentSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addDepartment({ department })
      if (res.success) {
        toast.success('Successfully Created...!', {
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#25ab11',
          },
          iconTheme: {
            primary: '#25ab11',
            secondary: '#FFFAEE',
          },
        });
        location.reload();
      } else {
        toast.error(res.message, {
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
          },
          iconTheme: {
            primary: '#713200',
            secondary: '#FFFAEE',
          },
        });
      }
    } catch (error) {
      toast.error(error.message, {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      });
    }
  }


  return (
    <div className="pageHeader">
      <div><Toaster position="top-right" reverseOrder={false} /></div>
      <div className="row">
        <div className="col-sm-9">
          <h3 className='page-title'>Department</h3>
          <p>Dashboard / Organization / Department</p>
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
                      <input type="text" className='form-control' value={department} onChange={e => setDepartment(e.target.value)} />
                    </div>
                  </div>
                </div>
                <div className="submit-section">
                  <button className='btn btn-primary submit-btn' type='submit' onClick={handleDepartmentSubmit}>Submit</button>
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