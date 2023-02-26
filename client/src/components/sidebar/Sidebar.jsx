import React, { useEffect } from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCompanyProfile } from '../../helper/CompanySettingsHelper'
import { setCompanyProfileData } from '../../redux/features/companyProfileSlice'

function Sidebar() {
    const dispatch = useDispatch();
    const { userDetails } = useSelector(state => state.user);
    const { companyProfileData } = useSelector(state => state.companyProfile);
    const role = userDetails.role;
    let token = userDetails.UserToken

    useEffect(() => {
        (async () => {
            const data = await getCompanyProfile(token);
            if (data.success) {
                dispatch(setCompanyProfileData(data.details));
            }
        })();
    }, []);

    return (
        <div className="sidebar">
            <div className="logo-details">
                {/* <i className="bx bxl-c-plus-plus"></i> */}
                <img src={companyProfileData?.logo} width='40px' height='40px' style={{ borderRadius: '50%', backgroundSize: 'contain' }} alt="" />
                <span className="logo_name">HR Management</span>
            </div>
            <ul className="nav-links">
                <li>
                    <Link>
                        <i class='bx bxs-dashboard bx-tada bx-rotate-90' ></i>
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
                            <i class='bx bxs-buildings bx-tada' ></i>
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
                            <i class='bx bx-group bx-tada' ></i>
                            <span className="link_name">Employees</span>
                        </Link>
                        <i className="bx bxs-chevron-down arrow"></i>
                    </div>
                    <ul className="sub-menu">
                        <li>
                            <Link className="link_name" >Employees</Link>
                        </li>
                        <li><Link to='/employee'>Employees</Link></li>
                        {(role === 'Employee' || role === 'HR') &&
                            <li><Link to='/profile' state={{ id: userDetails?._id }} >Profile</Link></li>
                        }
                        {/* <li><Link to=''>Disciplinary</Link></li>
                                <li><Link>Inactive User</Link></li> */}

                    </ul>
                </li>
                <li>
                    <div className="icon-link">
                        <Link>
                            <i class='bx bxs-package bx-tada' ></i>
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
                            <i class='bx bx-plus-medical bx-tada' ></i>
                            <span className="link_name">Leave</span>
                        </Link>
                        <i className="bx bxs-chevron-down arrow"></i>
                    </div>
                    {(role === 'Admin' || role === 'HR') &&
                        <ul className="sub-menu">
                            <li>
                                <Link className="link_name" >Leave</Link>
                            </li>
                            <li><Link to='/holiday'>Holiday</Link></li>
                            <li><Link to='/leave/jobRole'>Job Role Leave</Link></li>
                            <li><Link to='/leave'>Leave Type</Link></li>
                            <li><Link to='/alleaveApplications'>Leave Applications</Link></li>
                        </ul>}
                    {role === 'Employee' &&
                        <ul className="sub-menu">
                            <li>
                                <Link to='/leaveapplication' >Leave Application</Link>
                            </li>
                        </ul>
                    }
                </li>
                {(role === 'Admin' || role === 'HR') &&
                    <li>
                        <div className="icon-link">
                            <Link>
                                <i class='bx bxs-calendar bx-tada' ></i>
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
                }
                {(role === 'Admin' || role === 'HR') &&
                    <li>
                        <div className="icon-link">
                            <Link>
                                <i class='bx bx-money-withdraw bx-tada' ></i>
                                <span className="link_name">Payrol</span>
                            </Link>
                            <i className="bx bxs-chevron-down arrow"></i>
                        </div>
                        <ul className="sub-menu">
                            <li>
                                <Link className="link_name" >Payrol</Link>
                            </li>
                            <li><Link to='/payrol'>Payrol List</Link></li>
                            <li><Link to='/payslip'>Pay Slip</Link></li>
                        </ul>
                    </li>
                }

                {(role === 'Admin' || role === 'HR') &&
                    <>
                        <li>
                            <Link>
                                <i class='bx bxs-paper-plane bx-tada' ></i>
                                <span className="link_name"><Link to='/notice' className="link_name">Notice</Link></span>
                            </Link>
                            <ul className="sub-menu">
                                <li>
                                    <Link to='/notice' className='link_name'>Notice</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link>
                                <i class='bx bx-cog bx-tada' ></i>
                                <span className="link_name"><Link to='/settings' className="link_name">Settings</Link></span>
                            </Link>
                            <ul className="sub-menu">
                                <li>
                                    <Link to='/settings' className='link_name'>Settings</Link>
                                </li>
                            </ul>
                        </li>
                    </>
                }
            </ul>
        </div>
    )
}

export default Sidebar