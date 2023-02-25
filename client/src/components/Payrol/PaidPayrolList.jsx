import React, { useEffect } from 'react'
import DataTable from 'react-data-table-component';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPaidPayrolData } from '../../helper/PayrolHelper';
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
import { setPaidPayrolData } from '../../redux/features/payrolSlice';

const PaidPayrolList = () => {
    const { userDetails } = useSelector(state => state.user);
    const { paidPayrolLiist } = useSelector(state => state.payrol);
    const { loading } = useSelector(state => state.alerts);
    let token = userDetails.UserToken;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(showLoading());
        (async () => {
            try {
                const payrolData = await getAllPaidPayrolData(token);
                if (payrolData.success) {
                    dispatch(setPaidPayrolData(payrolData.payrolData));
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
            name: 'Net Payable',
            selector: row => row.payrolData?.netPayable
        },
        {
            name: 'Payment Method',
            selector: row => row.payrolData?.paymentMethod
        },
        {
            name: 'Paid On',
            selector: (row) => new Date(row.payrolData?.paidOn).toLocaleDateString('en-GB', {
                day: 'numeric', month: 'short', year: 'numeric'
            })
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
                {loading && <div class="d-flex justify-content-center">
                    <div class="spinner-border text-primary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>}
                {!loading &&
                    <DataTable
                        columns={column}
                        data={paidPayrolLiist}
                        pagination
                        fixedHeader
                        fixedHeaderScrollHeight='300px'
                        selectableRowsHighlight
                        highlightOnHover
                    />}
            </div>
        </>
    )
}

export default PaidPayrolList