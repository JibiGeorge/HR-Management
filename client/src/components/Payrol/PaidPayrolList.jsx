import React, { useEffect } from 'react'
import DataTable from 'react-data-table-component';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPaidPayrolData } from '../../helper/PayrolHelper';
import { setPaidPayrolData } from '../../redux/features/payrolSlice';

const PaidPayrolList = () => {
    const { userDetails } = useSelector(state => state.user);
    const { paidPayrolLiist } = useSelector(state => state.payrol);
    let token = userDetails.UserToken;
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            try {
                const payrolData = await getAllPaidPayrolData(token);
                console.log('adccadkj',payrolData);
                if (payrolData.success) {
                    dispatch(setPaidPayrolData(payrolData.payrolData));
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
        })();
    }, []);

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
        }
    ]

    return (
        <>
            <div className="mt-4 paid-table">
                <div className="form-title">
                    <h3>Paid History</h3>
                </div>
            <DataTable
                columns={column}
                data={paidPayrolLiist}
                pagination
                fixedHeader
                fixedHeaderScrollHeight='300px'
                selectableRowsHighlight
                highlightOnHover
            />
            </div>
        </>
    )
}

export default PaidPayrolList