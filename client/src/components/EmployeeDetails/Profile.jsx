import React from 'react'

function Profile(props) {
    const profileData = props.profile;
    return (
        <div className="profile">
            <div className="row">
                <div className="edit">
                    <a href="" className='edit-btn'>
                        <i className='fa fa-pencil'></i>
                    </a>
                </div>
                <div className='col-lg-5 profile-wrap'>
                    <div className="row">
                        <div className='col-lg-4'>
                            <img className="profile-img" src={profileData.image} alt="" />
                        </div>
                        <div className='col-lg-8 profile-info'>
                            <h3 className='username'>{profileData.firstName} {profileData.lastName}</h3>
                            <h6 className='designation'>{profileData.designation.designation}</h6>
                            <div className='department'>{profileData.department.department}</div>
                            <div className='empID'>Employee ID : {profileData.empCode}</div>
                            <div className='doj'>Date of join : {profileData.dateofJoin}</div>                            
                            <div className='status'>Status : <span>Active</span></div>
                        </div>
                    </div>
                </div>
                <div className='col-lg-7 personal-wrap'>
                    <ul className="personal-info">
                        <li>
                            <div className="title">Phone No:</div>
                            <div className="text">{profileData.contactNumber}</div>
                        </li>
                        <li>
                            <div className="title">Email:</div>
                            <div className="text">{profileData.email}</div>
                        </li>
                        <li>
                            <div className="title">Birthday:</div>
                            <div className="text">{profileData.dateofBirth}</div>
                        </li>
                        <li>
                            <div className="title">Address:</div>
                            <div className="text">{profileData.address ? profileData.address : 'Nil'}</div>
                        </li>
                        <li>
                            <div className="title">Gender:</div>
                            <div className="text">{profileData.gender}</div>
                        </li>
                        <li>
                            <div className="title">User Type:</div>
                            <div className="text">{profileData.role}</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Profile