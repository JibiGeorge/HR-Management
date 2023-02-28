import React from 'react'
import { Link } from 'react-router-dom'

const PendingPayrol = ({ generatedPayrolData }) => {
    return (
        <>
            <div className="col-lg-6 d-flex">
                <div className="card card-table">
                    <div className="card-header">
                        <h3 className='card-title'>Pending payrol Payments</h3>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table custom-table table-norwrap mb-0">
                                <tr>
                                    <th>Name</th>
                                    <th>Month</th>
                                    <th>Amount</th>
                                </tr>
                                {generatedPayrolData.slice(0, 3).map(item => (
                                    <tr>
                                        <td>{item.month}</td>
                                        <td>{item.employeeDetails[0]?.username}</td>
                                        <td>{item.payrolData?.netPayable}</td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                    </div>
                    <div className="card-footer">
                        <Link to='/hr/payrol'>View all Pending Payments</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PendingPayrol