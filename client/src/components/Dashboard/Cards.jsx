import React from 'react'
import './Style.css'

function Cards({ employeeCount, pendingLeaveCount }) {
    return (
        <div className="dashboard-card">
            <div className="row">
                <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                    <div className="card dash-widget">
                        <div className="card-body">
                            <span className='dash-widget-icon'>
                                <i class='bx bx-group bx-tada' ></i>
                            </span>
                            <div className="dash-widget-info">
                                <h3>{employeeCount ? employeeCount : 0}</h3>
                                <span>Employees</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                    <div className="card dash-widget">
                        <div className="card-body">
                            <span className='dash-widget-icon'>
                                <i class='bx bx-plus-medical bx-tada' ></i>
                            </span>
                            <div className="dash-widget-info">
                                <h3>{pendingLeaveCount ? pendingLeaveCount : 0}</h3>
                                <span>Leave Apllications</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cards