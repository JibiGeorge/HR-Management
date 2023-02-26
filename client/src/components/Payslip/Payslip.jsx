import React from 'react'
import jsPDF from 'jspdf'

const Payslip = ({ filtererdResult, copmpanyData, loading }) => {

    const exportPDF = () => {
        console.log('exporting....');
        const report = new jsPDF('landscape', 'pt', 'a4');
        report.html(document.querySelector('.payslip'), {
            x: 15,
            y: 15,
            html2canvas: {
                scale: .6
            },
            callback: () => {
                report.save('payslip.pdf');
            }
        })
    }
    return (
        <>
            {!loading &&
                <div className="payslip">
                    <div className="title">
                        <label>Pay Slip for the Month of {filtererdResult?.month}</label>
                    </div>
                    <div className="company">
                        <div className="logo">
                            <img src={copmpanyData?.logo} alt="" />
                        </div>
                        <div className="details">
                            <div>
                                <label>{copmpanyData?.companyName}</label>
                            </div>
                            <div>
                                <label>{copmpanyData?.address}</label>
                            </div>
                        </div>
                    </div>
                    <div className="employee-details mt-3">
                        <label className='sub-title'>Employee Details</label>
                        <div className="row p-2">
                            <div className="col-6">
                                <ul>
                                    <li>
                                        <label className='name'>Employee Name</label>:<label className='ms-4'>{filtererdResult?.employeeDetails[0]?.firstName} {filtererdResult?.employeeDetails[0]?.lastName}</label>
                                    </li>
                                    <li>
                                        <label className='name'>Designation</label>:<label className='ms-4'>{filtererdResult?.designation[0]?.designation}</label>
                                    </li>
                                    <li>
                                        <label className='name'>Department</label>:<label className='ms-4'>{filtererdResult?.department[0]?.department}</label>
                                    </li>
                                    <li>
                                        <label className='name'>Salary</label>:<label className='ms-4'>{filtererdResult?.payrolData.salary}</label>
                                    </li>

                                    <li>
                                        <label className='name'>Total Leaves</label>:<label className='ms-4'>{filtererdResult?.payrolData.totalLeaves ? filtererdResult?.payrolData?.totalLeaves : 0}</label>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-6">
                                <ul>
                                    <li>
                                        <label className='name'>Account Number</label>:<label className='ms-4'>{filtererdResult?.payrolData.bankAccount[0]?.accountNumber}</label>
                                    </li>
                                    <li>
                                        <label className='name'>IFSC Code</label>:<label className='ms-4'>{filtererdResult?.payrolData.bankAccount[0]?.ifscCode}</label>
                                    </li>
                                    <li>
                                        <label className='name'>Bank Name</label>:<label className='ms-4'>{filtererdResult?.payrolData.bankAccount[0]?.bankName}</label>
                                    </li>
                                    <li>
                                        <label className='name'>Branch Name</label>:<label className='ms-4'>{filtererdResult?.payrolData.bankAccount[0]?.branchName}</label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="payment-details">
                        <label className='sub-title'>Payment Details</label>
                        <div className="table">
                            <table>
                                <tr>
                                    <th>Description</th>
                                    <th>Earnings</th>
                                    <th>Description</th>
                                    <th>Deductions</th>
                                </tr>
                                <tr>
                                    <td>Basic Salary</td>
                                    <td>{filtererdResult?.payrolData.basicSalary ? filtererdResult?.payrolData?.basicSalary : 0}</td>
                                    <td>EPF</td>
                                    <td>{filtererdResult?.payrolData.employeePF ? filtererdResult?.payrolData?.employeePF : 0}</td>
                                </tr>
                                <tr>
                                    <td>Medical Allowances</td>
                                    <td>{filtererdResult?.payrolData.medical ? filtererdResult?.payrolData?.medical : 0}</td>
                                    <td>ESI</td>
                                    <td>{filtererdResult?.payrolData.employeeESI ? filtererdResult?.payrolData?.employeeESI : 0}</td>
                                </tr>
                                <tr>
                                    <td>House Rent</td>
                                    <td>{filtererdResult?.payrolData.houseRent ? filtererdResult?.payrolData?.houseRent : 0}</td>
                                    <td>TDS</td>
                                    <td>{filtererdResult?.payrolData.TDSAmount ? filtererdResult?.payrolData?.TDSAmount : 0}</td>
                                </tr>
                                <tr>
                                    <td>Coveyance</td>
                                    <td>{filtererdResult?.payrolData.conveyance ? filtererdResult?.payrolData?.conveyance : 0}</td>
                                    <td>Professional Tax</td>
                                    <td>{filtererdResult?.payrolData.professionalTax ? filtererdResult?.payrolData?.professionalTax : 0}</td>
                                </tr>
                                <tr>
                                    <td>Other</td>
                                    <td>{filtererdResult?.payrolData.other ? filtererdResult?.payrolData?.other : 0}</td>
                                    <td>Leave</td>
                                    <td>{filtererdResult?.payrolData.leaveDeduction}</td>
                                </tr>
                                <tfoot>
                                    <tr>
                                        <td>Total</td>
                                        <td>{filtererdResult?.payrolData?.basicSalary +
                                            filtererdResult?.payrolData?.medical +
                                            filtererdResult?.payrolData?.houseRent +
                                            filtererdResult?.payrolData?.conveyance +
                                            (filtererdResult?.payrolData?.other ? filtererdResult?.payrolData?.other : 0)}</td>
                                        <td></td>
                                        <td>{filtererdResult?.payrolData?.employeePF +
                                            filtererdResult?.payrolData?.employeeESI +
                                            (filtererdResult?.payrolData?.TDSAmount ? filtererdResult?.payrolData?.TDSAmount : 0) +
                                            (filtererdResult?.payrolData?.TDSAmount ? filtererdResult?.payrolData?.TDSAmount : 0) +
                                            (filtererdResult?.payrolData?.professionalTax ? filtererdResult?.payrolData?.professionalTax : 0)
                                        }</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>Net Payable</td>
                                        <td></td>
                                        <td>{filtererdResult?.payrolData.netPayable ? filtererdResult?.payrolData?.netPayable : 0}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            }
            <button className='btn btn-primary' onClick={exportPDF}>Export</button>
        </>
    )
}

export default Payslip