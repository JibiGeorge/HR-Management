import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeeAddressData, getEmployeeData, updateEmpPersonal } from '../../helper/Employeehelper';
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
import { setEmpIndividualData } from '../../redux/features/employee';
import { setEmployeeAddress } from '../../redux/features/employeeAddress';
import EditAddress from './EditAddress';

function Row1(props) {
  const dispatch = useDispatch();
  const profileData = props.profile;
  const empID = profileData._id;
  const { loading } = useSelector(state => state.alerts);
  const { employeeAddress } = useSelector(state => state.employeeAddress);
  const {userDetails} = useSelector(state => state.user);
  const token = userDetails.UserToken;

  const [showModalPersonalInfo, setShowModalPersonalInfo] = useState(false);
  const closePersonalModal = () => setShowModalPersonalInfo(false);

  const [showModalAddress, setShowModalAddress] = useState(false);
  const closeAddressModal = () => setShowModalAddress(false);

  useEffect(() => {
    (async () => {
      const addressData = await getEmployeeAddressData(empID,token);
      if (addressData.success) {
        dispatch(setEmployeeAddress(addressData.allAddress))
      }
    })()
  }, [])

  const onSubmit = async (values) => {
    dispatch(showLoading())
    try {
      const personalinfoUpdate = await updateEmpPersonal(values, empID,token)
      if (personalinfoUpdate.success) {
        const employeeData = await getEmployeeData(empID,token);
        let result = employeeData.data
        dispatch(setEmpIndividualData(result.data))
        toast.success(personalinfoUpdate.message, {
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
        closePersonalModal()
        dispatch(hideLoading())
      } else {
        toast.error(personalinfoUpdate.message, {
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
        dispatch(hideLoading())
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
      dispatch(hideLoading())
    }
  }

  const { values, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      firstName: profileData?.firstName,
      lastName: profileData?.lastName,
      username: profileData?.username,
      bloodGroup: profileData?.bloodGroup,
      panNumber: profileData?.panNumber,
      passportNumber: profileData?.passportNumber,
      nationality: profileData?.nationality,
      religion: profileData?.religion,
      maritialStatus: profileData?.maritialStatus
    },
    enableReinitialize: true,
    onSubmit
  })

  return (
    <>
      <div className="row box">
        <div className="col-lg-6 box1">
          <div className='row1'>
            <div className="edit">
              <button className='edit-btn' onClick={() => setShowModalPersonalInfo(true)}>
                <i className='fa fa-pencil'></i>
              </button>
            </div>
            <h3 className='title'>Personal Information</h3>
            <tbody className='personal-info-data'>
              <tr className="information">
                <td className="title">First Name:</td>
                <td className="text">{profileData.firstName}</td>
              </tr>
              <tr className="information">
                <td className="title">Last Name:</td>
                <td className="text">{profileData.lastName}</td>
              </tr>
              <tr className="information">
                <td className="title">User Name:</td>
                <td className="text">{profileData.username}</td>
              </tr>
              <tr className="information">
                <td className="title">Blood Group:</td>
                <td className="text">{profileData.bloodGroup}</td>
              </tr>
              <tr className="information">
                <td className="title">PAN Number:</td>
                <td className="text">{profileData.panNumber}</td>
              </tr>
              <tr className="information">
                <td className="title">Passport No:</td>
                <td className="text">{profileData.passportNumber ? profileData.passportNumber : 'Nil'}</td>
              </tr>
              <tr className="information">
                <td className="title">Nationality:</td>
                <td className="text">{profileData.nationality ? profileData.nationality : 'Nil'}</td>
              </tr>
              <tr className="information">
                <td className="title">Religion:</td>
                <td className="text">{profileData.religion ? profileData.religion : 'Nil'}</td>
              </tr>
              <tr className="information">
                <td className="title">Maritial Status:</td>
                <td className="text">{profileData.maritialStatus ? profileData.maritialStatus : 'Nil'}</td>
              </tr>
            </tbody>
          </div>
        </div>
        <div className="col-lg-6 box2">
          <div className='row1'>
            <div className="edit">
              <button className='edit-btn' onClick={() => setShowModalAddress(true)}>
                <i className='fa fa-pencil'></i>
              </button>
            </div>
            <h3 className='title'>Address</h3>
            <div className="permanent-address">
              <h4 className="sub-title">Permanent Address</h4>
              <span className='text'>{employeeAddress?.permanentAddress ? employeeAddress.permanentAddress : 'Nill'}</span>
            </div>
            <div className="temprory-address">
              <h4 className="sub-title">Temprory Address</h4>
              <span className='text'>{employeeAddress?.temproryAddress ? employeeAddress.temproryAddress : 'Nill'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Personal information Update Modal */}
      {showModalPersonalInfo &&
        <>
          <div className="modal-wrapper">
            <div className="modal-container">
              <div className="modal-content">
                <div className="modal-header">
                  <div className="form-header">
                    <h3>Update Personal Information</h3>
                  </div>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>First Name</label>
                        <input type="text" className='form-control' id='firstName'
                          value={values.firstName}
                          onChange={(e) => setFieldValue("firstName", e.target.value)} />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" className='form-control' id='lastName'
                          value={values.lastName}
                          onChange={(e) => setFieldValue("lastName", e.target.value)} />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>User Name</label>
                        <input type="text" className='form-control' id='username'
                          value={values.username}
                          onChange={(e) => setFieldValue("username", e.target.value)} />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Blood Group</label>
                        <select name="assetCategory" id="bloodGroup"
                          value={values.bloodGroup}
                          onChange={(e) => setFieldValue("bloodGroup", e.target.value)}  >
                          <option value="">Select Blood Group</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="B+">B+</option>
                          <option value="B">B-</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>PAN Number</label>
                        <input type="text" className='form-control' id='panNumber'
                          value={values.panNumber}
                          onChange={(e) => setFieldValue("panNumber", e.target.value)} />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Passport Number</label>
                        <input type="text" className='form-control' id='passportNumber'
                          value={values.passportNumber}
                          onChange={(e) => setFieldValue("passportNumber", e.target.value)} />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Nationality</label>
                        <select name="assetCategory" id="nationality"
                          value={values.nationality}
                          onChange={(e) => setFieldValue("nationality", e.target.value)}>
                          <option value="">Select Nationality</option>
                          <option value="INDIAN">INDIAN</option>
                          <option value="USA">USA</option>
                          <option value="EUROPE">EUROPE</option>
                          <option value="UAE">UAE</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Religion</label>
                        <select name="assetCategory" id="religion"
                          value={values.religion}
                          onChange={(e) => setFieldValue("religion", e.target.value)} >
                          <option value="">Select Religion</option>
                          <option value="Christian">Christian</option>
                          <option value="Muslim">Muslim</option>
                          <option value="Hindu">Hindu</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Martial Status</label>
                        <select name="assetCategory" id="maritialStatus"
                          value={values.maritialStatus}
                          onChange={(e) => setFieldValue("maritialStatus", e.target.value)} >
                          <option value="">Select Status</option>
                          <option value="Single">Single</option>
                          <option value="Married">Married</option>
                          <option value="Widow">Widow</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
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
                          <button className='btn btn-primary' onClick={handleSubmit} >Update</button>
                        </div>
                        <div>
                          <button className='btn btn-primary' onClick={closePersonalModal}>Cancel</button>
                        </div>
                      </div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>}

      {/* Address Update Modal */}
      {showModalAddress && <EditAddress closeModal={closeAddressModal} id={empID} />}
    </>

  )
}

export default Row1