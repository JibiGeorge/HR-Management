import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { getAllDepartments } from '../../helper/Departmenthelper';
import { addDesignation } from '../../helper/Designationhelper';

function PageHeader() {

  const initialValue = {
    departmentId: "",
    designation: ""
  }

  const [designationData, setDesignationData] = useState(initialValue);
  const [department, setDepartment] = useState([])

  useEffect(() => {
    try {
      (async () => {
        try {
          const departmentData = await getAllDepartments();
          setDepartment(departmentData)
        } catch (error) {
          console.log(error.message);
        }
      })();
    } catch (error) {
      console.log('====>', error.message);
    }
  }, [])


  // Handle Add Designation
  const handleDesignationSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addDesignation({ designationData });
      if (response.success) {
        toast.success(response.message, {
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
        toast.error(response.message, {
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
          <h3 className='page-title'>Designation</h3>
          <p>Dashboard / Organization / Designation</p>
        </div>
        <div className="col-sm-3">
          <button type="button" class="btn btn-primary add-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <i className="fa fa-plus"></i>
            Add Designation
          </button>
        </div>
      </div>

      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 className='modal-title'>Add Designation</h5>
              <button type="button" class="btn btn-secondary close" data-bs-dismiss="modal">
                <span>x</span>
              </button>
            </div>
            <div class="modal-body">
              <form action="#">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label>Department Name*</label>
                      <select className='form-select' aria-label='Default select example'
                        value={designationData.departmentId}
                        onChange={e => setDesignationData({ ...designationData, departmentId: e.target.value })}
                      >
                        <option value="" selected>Select A Department</option>
                        {department.map(res => {
                          return (
                            <option value={res._id}>{res.department}</option>
                          )
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label>Designation Name</label>
                      <input type="text" className='form-control' value={designationData.designation} onChange={e => setDesignationData({ ...designationData, designation: e.target.value })} />
                    </div>
                  </div>
                </div>
                <div className="submit-section">
                  <button className='btn btn-primary submit-btn' type='submit' onClick={handleDesignationSubmit}>Submit</button>
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