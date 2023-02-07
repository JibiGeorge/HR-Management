import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="logo-details">
                <i className="bx bxl-c-plus-plus"></i>
                <span className="logo_name">HR Management</span>
            </div>
            <ul className="nav-links">
                <li>
                    <Link>
                        <i className="bx bx-grid-alt"></i>
                        <span className="link_name"><Link to='/dashboard' className="link_name">Dashboard</Link></span>
                    </Link>
                    <ul className="sub-menu">
                        <li>
                            <Link to='/dashboard' className='link_name'>Dashboard</Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <div className="icon-link">
                        <Link>
                            <i className="bx bx-collection"></i>
                            <span className="link_name">Organization</span>
                        </Link>
                        <i className="bx bxs-chevron-down arrow"></i>
                    </div>
                    <ul className="sub-menu">
                        <li>
                            <Link className="link_name" >Organization</Link>
                        </li>
                        <li><Link to='/department'>Department</Link></li>
                        <li><Link to='/designation'>Designation</Link></li>
                    </ul>
                </li>
                <li>
                    <div className="icon-link">
                        <Link>
                            <i className="bx bx-collection"></i>
                            <span className="link_name">Employees</span>
                        </Link>
                        <i className="bx bxs-chevron-down arrow"></i>
                    </div>
                    <ul className="sub-menu">
                        <li>
                            <Link className="link_name" >Employees</Link>
                        </li>
                        <li><Link to='/employee'>Employees</Link></li>
                        <li><Link to=''>Disciplinary</Link></li>
                        <li><Link>Inactive User</Link></li>
                    </ul>
                </li>
                <li>
                    <div className="icon-link">
                        <Link>
                            <i className="bx bx-collection"></i>
                            <span className="link_name">Assets</span>
                        </Link>
                        <i className="bx bxs-chevron-down arrow"></i>
                    </div>
                    <ul className="sub-menu">
                        <li>
                            <Link className="link_name" >Assets</Link>
                        </li>
                        <li><Link to='/assetsCategory'>Assets Category</Link></li>
                        <li><Link to='/assets'>Add Assets</Link></li>
                    </ul>
                </li>
                <li>
                    <div className="icon-link">
                        <Link>
                            <i className="bx bx-collection"></i>
                            <span className="link_name">Leave</span>
                        </Link>
                        <i className="bx bxs-chevron-down arrow"></i>
                    </div>
                    <ul className="sub-menu">
                        <li>
                            <Link className="link_name" >Leave</Link>
                        </li>
                        <li><Link to='/holiday'>Holiday</Link></li>
                        <li><Link to='/leave/jobRole'>Job Role Leave</Link></li>
                        <li><Link to='/leave'>Leave Type</Link></li>
                        <li><Link>Leave Application</Link></li>
                        <li><Link>Earned Leaves</Link></li>
                    </ul>
                </li>
                
                <li>
                    <div className="icon-link">
                        <Link>
                            <i className="bx bx-collection"></i>
                            <span className="link_name">Attendance</span>
                        </Link>
                        <i className="bx bxs-chevron-down arrow"></i>
                    </div>
                    <ul className="sub-menu">
                        <li>
                            <Link className="link_name" >Leave</Link>
                        </li>
                        <li><Link to='/attendance'>Attendance</Link></li>
                        <li><Link>Attendance Report</Link></li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar