import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'

function Sidebar() {
    return (
        <div class="sidebar">
            <div class="logo-details">
                <i class="bx bxl-c-plus-plus"></i>
                <span class="logo_name">HR Management</span>
            </div>
            <ul class="nav-links">
                <li>
                    <Link>
                        <i class="bx bx-grid-alt"></i>
                        <span class="link_name">Dashboard</span>
                    </Link>
                    <ul class="sub-menu">
                        <li>
                            <Link className='link_name'>Dashboard</Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <div class="icon-link">
                        <Link>
                            <i class="bx bx-collection"></i>
                            <span class="link_name">Organization</span>
                        </Link>
                        <i class="bx bxs-chevron-down arrow"></i>
                    </div>
                    <ul class="sub-menu">
                        <li>
                            <Link class="link_name" >Organization</Link>
                        </li>
                        <li><Link to='/department'>Department</Link></li>
                        <li><Link>Designation</Link></li>
                    </ul>
                </li>
                <li>
                    <div class="icon-link">
                        <Link>
                            <i class="bx bx-collection"></i>
                            <span class="link_name">Employees</span>
                        </Link>
                        <i class="bx bxs-chevron-down arrow"></i>
                    </div>
                    <ul class="sub-menu">
                        <li>
                            <Link class="link_name" >Employees</Link>
                        </li>
                        <li><Link to=''>Employees</Link></li>
                        <li><Link to=''>Disciplinary</Link></li>
                        <li><Link>Inactive User</Link></li>
                    </ul>
                </li>
                <li>
                    <div class="icon-link">
                        <Link>
                            <i class="bx bx-collection"></i>
                            <span class="link_name">Attendance</span>
                        </Link>
                        <i class="bx bxs-chevron-down arrow"></i>
                    </div>
                    <ul class="sub-menu">
                        <li>
                            <Link class="link_name" >Attendance</Link>
                        </li>
                        <li><Link to=''>Attendance List</Link></li>
                        <li><Link to=''>Add Attendance</Link></li>
                        <li><Link>Attendance Report</Link></li>
                    </ul>
                </li>
                <li>
                    <div class="icon-link">
                        <Link>
                            <i class="bx bx-collection"></i>
                            <span class="link_name">Attendance</span>
                        </Link>
                        <i class="bx bxs-chevron-down arrow"></i>
                    </div>
                    <ul class="sub-menu">
                        <li>
                            <Link class="link_name" >Attendance</Link>
                        </li>
                        <li><Link to=''>Attendance List</Link></li>
                        <li><Link to=''>Add Attendance</Link></li>
                        <li><Link>Attendance Report</Link></li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar