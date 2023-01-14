import React from 'react'
import './Style.css'

function Cards() {
    return (
        <div className="dashboard-card">
            <div className="row">
                <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                    <div className="card dash-widget">
                        <div className="card-body">
                            <span className='dash-widget-icon'>
                                <i className="fa fa-cubes"></i>
                            </span>
                            <div className="dash-widget-info">
                                <h3>112</h3>
                                <span>Employees</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                    <div className="card dash-widget">
                        <div className="card-body">
                            <span className='dash-widget-icon'>
                                <i className="fa fa-usd"></i>
                            </span>
                            <div className="dash-widget-info">
                                <h3>112</h3>
                                <span>Employees</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                    <div className="card dash-widget">
                        <div className="card-body">
                            <span className='dash-widget-icon'>
                                <i className="fa fa-diamond"></i>
                            </span>
                            <div className="dash-widget-info">
                                <h3>112</h3>
                                <span>Employees</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                    <div className="card dash-widget">
                        <div className="card-body">
                            <span className='dash-widget-icon'>
                                <i className="fa fa-user"></i>
                            </span>
                            <div className="dash-widget-info">
                                <h3>112</h3>
                                <span>Employees</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cards