import React from 'react'
import './Style.css'
import { useFormik } from 'formik'
import { addDepartment } from '../../helper/Departmenthelper';
import { useNavigate } from 'react-router-dom';

function PageHeader() {
  
  const formik = useFormik({
    initialValues: {
      department: ''
    },
    onSubmit: async values =>{
      const res = await addDepartment(values)
      location.reload();
      if(res){
      }
    }
  });

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
              <form onClick={formik.handleSubmit}>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label>Department Name</label>
                      <input type="text" className='form-control' {...formik.getFieldProps('department')} />
                    </div>
                  </div>
                </div>
                <div className="submit-section">
                  <button className='btn btn-primary submit-btn' type='submit'>Submit</button>
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