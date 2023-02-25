import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { generateEmployeePayslip, getAllPaidPayrolData, getAllPendingPayrolData, getPayrolData } from '../../helper/PayrolHelper';
import { setGeneratedPayrolData, setPaidPayrolData } from '../../redux/features/payrolSlice';

const PayslipGenerate = ({ docID, payrolID, closePaySlipForm }) => {
    const dispatch = useDispatch();
    const { userDetails } = useSelector(state => state.user);
    let token = userDetails.UserToken;

    const [bankDetails, setBankDetails] = useState('')
    const [employeePayrolDetails, setEmployeePayrolDetails] = useState('');
    const [employeeDetails, setEmployeeDetails] = useState('');

    const [paymentMethod, setPaymentMethod] = useState("cash");
    const [bankDetailsVisible, setBankDetailsVisible] = useState(false);

    const handlePaymentMethodChange = (event) => {
        const value = event.target.value;
        setPaymentMethod(value);
        if (value === "Bank") {
            setBankDetailsVisible(true);
        } else {
            setBankDetailsVisible(false);
        }
    };

    useEffect(() => {
        (async () => {
            try {
                const payrolData = await getPayrolData(token, docID, payrolID);
                if (payrolData.success) {
                    setEmployeePayrolDetails(payrolData?.payrolData[0]);
                    setBankDetails(payrolData?.bankDetails);
                    setEmployeeDetails(payrolData.payrolData[0]?.employeeDetails[0])
                } else {
                    toast.error(payrolData.message, {
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
            } catch (error) {
                toast.error('Something went Wrong', {
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
        })()
    }, [])

    const onSubmit = async (values) => {
        const payrolDocID = employeePayrolDetails?._id
        const payrolDataID = employeePayrolDetails.payrolData?._id
        try {
            const generate = await generateEmployeePayslip(token, values, payrolDocID, paymentMethod, payrolDataID)
            if (generate.success) {
                const pendingPayrolData = await getAllPendingPayrolData(token);
                const paidPayrolData = await getAllPaidPayrolData(token);
                dispatch(setPaidPayrolData(paidPayrolData.payrolData));
                dispatch(setGeneratedPayrolData(pendingPayrolData.payrolData));
                closePaySlipForm();
                toast.success(generate.message, {
                    style: {
                        border: '1px solid #713200',
                        padding: '16px',
                        color: '#25ab11',
                    },
                    iconTheme: {
                        primary: '#25ab11',
                        secondary: '#FFFAEE',
                    },
                });
            } else {
                toast.error(generate.message, {
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
        } catch (error) {
            toast.error('Something went Wrong', {
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
    }

    const { values, setFieldValue, handleSubmit } = useFormik({
        initialValues: {
            accountNumber: bankDetails?.accountNumber,
            ifscCode: bankDetails?.ifscCode,
            bankName: bankDetails?.bankName,
            branchName: bankDetails?.branchName,
            paidOn: ''
        },
        enableReinitialize: true,
        onSubmit
    })
    return (
        <>
            <div className="payslip-section">
                <div className="form-title">
                    <span>Pay Slip Generating</span>
                </div>
                <div className="payslip-details">
                    <div className="row">
                        {/* Employee Details */}
                        <div className="col-lg-6">
                            <ul>
                                <li>
                                    <div className="title">Employee Name :- </div>
                                    <div className="text">{employeeDetails?.firstName}</div>
                                </li>
                                <li>
                                    <div className="title">Department :- </div>
                                    <div className="text">{employeeDetails?.department}</div>
                                </li>
                                <li>
                                    <div className="title">Salary :- </div>
                                    <div className="text">{employeePayrolDetails.payrolData?.salary}</div>
                                </li>
                                <li>
                                    <div className="title">Total Leaves :- </div>
                                    <div className="text">{employeePayrolDetails.payrolData?.totalLeaves}</div>
                                </li>
                                <li>
                                    <div className="title">Gross Salary :- </div>
                                    <div className="text">{employeePayrolDetails.payrolData?.grossSalary}</div>
                                </li>
                                <li>
                                    <div className="title">Net Payable :- </div>
                                    <div className="text">{employeePayrolDetails.payrolData?.netPayable}</div>
                                </li>
                            </ul>
                        </div>
                        {/* Tax Details */}
                        <div className="col-lg-6">
                            <ul>
                                <li>
                                    <div className="title">PF - Employee :- </div>
                                    <div className="text">{employeePayrolDetails.payrolData?.employeePF}</div>
                                </li>
                                <li>
                                    <div className="title">ESI - Employee :- </div>
                                    <div className="text">{employeePayrolDetails.payrolData?.employeeESI}</div>
                                </li>
                                <li>
                                    <div className="title">PF - Employeer :- </div>
                                    <div className="text">{employeePayrolDetails.payrolData?.employeerPF}</div>
                                </li>
                                <li>
                                    <div className="title">ESI - Employeer :- </div>
                                    <div className="text">{employeePayrolDetails.payrolData?.employeerESI}</div>
                                </li>
                                <li>
                                    <div className="title">TDS :- </div>
                                    <div className="text">{employeePayrolDetails.payrolData?.TDSAmount}</div>
                                </li>
                            </ul>
                        </div>
                        {/* Payment Made */}
                        <div className="col-12">
                            <h4 className='sub-title'>Payment Made Through</h4>
                            <div>
                                <input class="form-check-input me-3" type="radio" name="payment"
                                    value="Cash" checked={paymentMethod === 'Cash'} onChange={handlePaymentMethodChange} />Cash
                                <input class="form-check-input ms-4 me-3" type="radio" name="payment"
                                    value="Bank" checked={paymentMethod === 'Bank'} onChange={handlePaymentMethodChange} />Bank
                            </div>
                            {bankDetailsVisible &&
                                // Bank Details
                                <div className='row'>
                                    <div className="col-lg-3 col-sm-6">
                                        <div className="form-group">
                                            <div className="title">
                                                <label className='col-form-label'>Account Number</label>
                                            </div>
                                            <div>
                                                <input type="text" id='accountNumber' value={values.accountNumber}
                                                    onChange={(e) => setFieldValue("accountNumber", e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-sm-6">
                                        <div className="form-group">
                                            <div className="title">
                                                <label className='col-form-label'>IFSC Coder</label>
                                            </div>
                                            <div>
                                                <input type="text" id='ifscCode' value={values.ifscCode}
                                                    onChange={(e) => setFieldValue("ifscCode", e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-sm-6">
                                        <div className="form-group">
                                            <div className="title">
                                                <label className='col-form-label'>Bank Name</label>
                                            </div>
                                            <div>
                                                <input type="text" id='bankName' value={values.bankName}
                                                    onChange={(e) => setFieldValue("bankName", e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-sm-6">
                                        <div className="form-group">
                                            <div className="title">
                                                <label className='col-form-label'>Branch Name</label>
                                            </div>
                                            <div>
                                                <input type="text" id='branchName' value={values.branchName}
                                                    onChange={(e) => setFieldValue("branchName", e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>

                        <div className="col-lg-3 col-sm-6">
                            <div className="form-group">
                                <div className="title">
                                    <label className='col-form-label'>Paid On</label>
                                </div>
                                <div>
                                    <input type="date" id='paidOn' value={values.paidOn}
                                        onChange={(e) => setFieldValue("paidOn", e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 mt-3">
                            <div className='form-button'>
                                <button type='submit' className='btn btn-primary add-btn' onClick={handleSubmit} >GENERATE</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PayslipGenerate