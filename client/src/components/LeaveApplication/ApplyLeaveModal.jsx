import { useFormik } from 'formik';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { applyLeave, getUserLeaveApplications } from '../../helper/LeaveApplication';
import { setUserLeaveApplications } from '../../redux/features/leaveApplicationsSlice';

const ApplyLeaveModal = ({ closeModal, leaveTypes }) => {
  const { loading } = useSelector(state => state.alerts);
  const [totalLeaveDays, setTotalLeaveDays] = useState(0);
  const { userDetails } = useSelector(state => state.user);
  const token = userDetails.UserToken;
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    try {
      const apply = await applyLeave(values, totalLeaveDays, token);
      if (apply.success) {
        const userLeaveApplications = await getUserLeaveApplications(token);
        if(userLeaveApplications.success){
          dispatch(setUserLeaveApplications(userLeaveApplications))
        }
        toast.success(apply.message, {
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
        closeModal();
      } else {
        toast.error(apply.message, {
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
      toast.error('Something Went Wrong..!', {
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
  const totalDays = () => {
    const start = new Date(values.fromDate);
    const end = new Date(values.toDate);
    const modeOfLeave = values.modeOfLeave;
    const diffTime = Math.abs(end - start);
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24) + 1);
    if (modeOfLeave == 'HalfDay') {
      diffDays = diffDays / 2;
    }
    setTotalLeaveDays(diffDays ? diffDays : 0);
  }

  const { values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      leaveType: '',
      applyDate: new Date().toISOString().slice(0, 10),
      fromDate: '',
      toDate: '',
      modeOfLeave: ''
    },
    onSubmit
  })
  return (
    <>
      <div className="modal-wrapper">
        <div className="modal-container">
          <div className="modal-content">
            <div className="modal-header">
              <div className="form-header">
                <h3>Apply For A Leave</h3>
              </div>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-lg-6 col-sm-12 col-xl-6 mb-3">
                  <div className="form-group">
                    <label>Leave Type</label>
                    <select id='leaveType' value={values.leaveType} onChange={handleChange}>
                      <option>Select Leave Type</option>
                      {leaveTypes?.map((values) => {
                        return (
                          <option value={values._id}>{values.leaveType}</option>
                        )
                      })}
                    </select>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-12 col-xl-6 mb-3">
                  <div className="form-group">
                    <label>Apply Date</label>
                    <input type="date" className="form-control" id='applyDate' disabled
                      value={new Date().toISOString().slice(0, 10)} onChange={handleChange} />
                  </div>
                </div>
                <div className="col-lg-6 col-sm-12 col-xl-6 mb-3">
                  <div className="form-group">
                    <label>From Date</label>
                    <input type="date" className="form-control" id='fromDate'
                      value={values.fromDate} onChange={handleChange} />
                  </div>
                </div>
                <div className="col-lg-6 col-sm-12 col-xl-6 mb-3">
                  <div className="form-group">
                    <label>To Date</label>
                    <input type="date" className="form-control" id='toDate'
                      value={values.toDate} onChange={handleChange} />
                  </div>
                </div>
                <div className="col-lg-6 col-sm-12 col-xl-6 mb-3">
                  <div className="form-group">
                    <label>Mode of Leave</label>
                    <select id='modeOfLeave' value={values.modeOfLeave} onChange={handleChange}>
                      <option>Select Mode</option>
                      <option value='HalfDay' >Half Day</option>
                      <option value='FullDay' >Full Day</option>
                    </select>
                  </div>
                </div>
              </div>
              <p style={{ color: 'red', fontWeight: '600' }}>Total Days : <span>{totalLeaveDays}</span>
                <button className='btn' style={{ textDecoration: 'underline' }} onClick={totalDays}>Click Here</button>
              </p>
            </div>
            {totalLeaveDays > 0 &&
              <div className="modal-footer">
                <div className="modal-btn delete-action">
                  {loading && <div class="d-flex justify-content-center">
                    <div class="spinner-border text-primary" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div>}
                  {!loading &&
                    <div className="button">
                      <div>
                        <button className="btn btn-primary" onClick={handleSubmit}>Apply</button>
                      </div>
                      <div>
                        <button className="btn btn-primary" onClick={closeModal}>Cancel</button>
                      </div>
                    </div>}
                </div>
              </div>}
          </div>
        </div>
      </div>
    </>
  )
}

export default ApplyLeaveModal