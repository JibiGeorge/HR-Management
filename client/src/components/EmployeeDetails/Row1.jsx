import React from 'react'

function Row1() {
  return (
    <div className="row box">
      <div className="col-lg-6 box1">
        <div className='row1'>
          <div className="edit">
            <a href="" className='edit-btn'>
              <i className='fa fa-pencil'></i>
            </a>
          </div>
          <h3 className='title'>Personal Information</h3>
          <tbody className='personal-info-data'>
            <tr className="information">
              <td className="title">First Name:</td>
              <td className="text">Jibi</td>
            </tr>
            <tr className="information">
              <td className="title">Last Name:</td>
              <td className="text">George</td>
            </tr>
            <tr className="information">
              <td className="title">Blood Group:</td>
              <td className="text">o+</td>
            </tr>
            <tr className="information">
              <td className="title">PAN Number:</td>
              <td className="text">DHNPG2837L</td>
            </tr>
            <tr className="information">
              <td className="title">Passport No:</td>
              <td className="text">FGH6546</td>
            </tr>
            <tr className="information">
              <td className="title">Nationality:</td>
              <td className="text">INDIAN</td>
            </tr>
            <tr className="information">
              <td className="title">Religion:</td>
              <td className="text">o+</td>
            </tr>
            <tr className="information">
              <td className="title">Maritial Status:</td>
              <td className="text">Single</td>
            </tr>
          </tbody>
        </div>
      </div>
      <div className="col-lg-6 box2">
        <div className='row1'>
          <div className="edit">
            <a href="" className='edit-btn'>
              <i className='fa fa-pencil'></i>
            </a>
          </div>
          <h3 className='title'>Address</h3>
          <div className="permanent-address">
            <h4 className="sub-title">Permanent Address</h4>
            <span className='text'>Prakash Bhavanam, Karanthadu(P.O), Payyannur, Kannur, 670308</span>
          </div>
          <div className="temprory-address">
            <h4 className="sub-title">Temprory Address</h4>
            <span className='text'>Prakash Bhavanam, Karanthadu(P.O), Payyannur, Kannur, 670308</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Row1