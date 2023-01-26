import React from 'react'

function Row1(props) {
  const profileData = props.profile;
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
              <td className="text">{profileData.firstName}</td>
            </tr>
            <tr className="information">
              <td className="title">Last Name:</td>
              <td className="text">{profileData.lastName}</td>
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
              <td className="text">{profileData.maritial ? profileData.maritial : 'Nil'}</td>
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