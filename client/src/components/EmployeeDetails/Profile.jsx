import React from 'react'

function Profile() {
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
                            <img className="profile-img" src=".../../public/assets/avatar-05.jpg" alt="" />
                        </div>
                        <div className='col-lg-8 profile-info'>
                            <h3 className='username'>Jibi George</h3>
                            <h6 className='designation'>MERN Stack Developer</h6>
                            <div className='department'>Developer</div>
                            <div className='empID'>Employee ID : 0011</div>
                            <div className='doj'>Date of join : 01-01-2023</div>                            
                            <div className='status'>Status : <span>Active</span></div>
                        </div>
                    </div>
                </div>
                <div className='col-lg-7 personal-wrap'>
                    <ul className="personal-info">
                        <li>
                            <div className="title">Phone No:</div>
                            <div className="text">8893482860</div>
                        </li>
                        <li>
                            <div className="title">Email:</div>
                            <div className="text">jibiyyan@gmail.com</div>
                        </li>
                        <li>
                            <div className="title">Birthday:</div>
                            <div className="text">24-05-1997</div>
                        </li>
                        <li>
                            <div className="title">Address:</div>
                            <div className="text">Prakash Bhavanam, Karanthadu(P.O), Payyannur, 670308</div>
                        </li>
                        <li>
                            <div className="title">Gender:</div>
                            <div className="text">Male</div>
                        </li>
                        <li>
                            <div className="title">User Type:</div>
                            <div className="text">Employee</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Profile