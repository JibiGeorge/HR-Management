import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPendingPayrolData, getPayrolData } from '../../helper/PayrolHelper';
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
import { setGeneratedPayrolData } from '../../redux/features/payrolSlice';
import PayslipGenerate from './PayslipGenerate';

const PayrolGeneratedList = () => {
    const { loading } = useSelector(state => state.alerts);
    const { userDetails } = useSelector(state => state.user);
    const { generatedPayrolData } = useSelector(state => state.payrol);
    let token = userDetails.UserToken;
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(showLoading());
        (async () => {
            try {
                const payrolData = await getAllPendingPayrolData(token);
                console.log(payrolData.payrolData);
                if (payrolData.success) {
                    dispatch(setGeneratedPayrolData(payrolData.payrolData));
                    dispatch(hideLoading());
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
                    dispatch(hideLoading());
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
                dispatch(hideLoading());
            }
        })();
    }, []);

    const [payslipForm, setPaySlipForm] = useState(false);
    const [docID, setDocID] =useState('')
    const [payrolID, setpayrolID] =useState('')

    const generateSlip = async (docID, payrolID)=>{
        setPaySlipForm(true);
        setDocID(docID)
        setpayrolID(payrolID)
    }

    const column = [
        {
            name: 'Employee Name',
            selector: row => row.employeeDetails[0]?.username
        },
        {
            name: 'Month',
            selector: row => row?.month
        },
        {
            name: 'Salary',
            selector: row => row.payrolData?.salary
        },
        {
            name: 'Leaves',
            selector: row => row.payrolData?.totalLeaves
        },
        {
            name: 'Gross Salary',
            selector: row => row.payrolData?.grossSalary
        },
        {
            name: 'EEF',
            selector: row => row.payrolData?.employeePF
        },
        {
            name: 'ERF',
            selector: row => row.payrolData?.employeerPF
        },
        {
            name: 'EESI',
            selector: row => row.payrolData?.employeeESI
        },
        {
            name: 'ERSI',
            selector: row => row.payrolData?.employeerESI
        },
        {
            name: 'TDS',
            selector: row => row.payrolData?.TDSAmount
        },
        {
            name: 'Net Payable',
            selector: row => row.payrolData?.netPayable
        },
        {
            name: 'Status',
            selector: row => row.payrolData?.status
        },
        {
            name: "Action",
            cell: (row) => (<button className='btn btn-success' style={{ fontSize: '10px', padding: '5px' }} onClick={() => generateSlip(row?._id, row.payrolData?._id)} >Generate</button>)
        }
    ]
    return (
        <>
            {loading && <div class="d-flex justify-content-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>}
            {!loading &&
                <DataTable
                    columns={column}
                    data={generatedPayrolData}
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight='300px'
                    selectableRowsHighlight
                    highlightOnHover
                />}

                {payslipForm && <PayslipGenerate docID={docID} payrolID={payrolID} />}
        </>
    )
}

export default PayrolGeneratedList