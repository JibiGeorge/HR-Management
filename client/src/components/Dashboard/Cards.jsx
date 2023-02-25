import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { getEmployeeCount, getPendingLeaveCount } from '../../helper/Employeehelper';
import './Style.css'

function Cards({ token }) {
    const [employeeCount, setEmployeeCount] = useState(0);
    const [pendingLeaveCount, setPendingLeaveCount] = useState(0);
    useEffect(() => {
        (async () => {
            try {
                const employeeCount = await getEmployeeCount(token)
                const pendingLeaveCount = await getPendingLeaveCount(token)
                setEmployeeCount(employeeCount?.count)
                setPendingLeaveCount(pendingLeaveCount?.count)
            } catch (error) {
                toast.error('Fetching Data Failed', {
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
            }
        })();
    }, []);
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
                                <h3>{employeeCount}</h3>
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
                                <h3>{pendingLeaveCount}</h3>
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