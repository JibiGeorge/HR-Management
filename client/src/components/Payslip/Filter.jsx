import React, { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEmployees } from '../../helper/Employeehelper';
import { getEmpPayrolData } from '../../helper/PayrolHelper';
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
import { setEmployeesData } from '../../redux/features/employee';
import Payslip from './Payslip';
import { getCompanyProfile } from '../../helper/CompanySettingsHelper'

const Filter = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.alerts);
    const { userDetails } = useSelector(state => state.user);
    const { employeesDetails } = useSelector(state => state.employees);

    const token = userDetails.UserToken;

    useEffect(() => {
        (async () => {
            dispatch(showLoading());
            try {
                const employeeList = await getAllEmployees(token);
                if (employeeList.success) {
                    dispatch(setEmployeesData(employeeList.list));
                    dispatch(hideLoading());
                } else {
                    toast.error(employeeList.message, {
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
                toast.error('Connection Issue', {
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
            dispatch(hideLoading());
        })();
    }, []);

    const initialValues = {
        employee: '',
        month: ''
    }
    const [filterData, setFilterData] = useState(initialValues);
    const [filtererdResult, setFiltererdResult] = useState('');
    const [copmpanyData, setCompanyData] = useState('')
    const [showPayslip, setShowPayslip] = useState(false);
    const handleSearch = async () => {
        dispatch(showLoading());
        try {
            const payrolData = await getEmpPayrolData(token, filterData);
            const company = await getCompanyProfile(token);
            if (payrolData.success) {
                setFiltererdResult(payrolData?.data[0]);
                setCompanyData(company.details)
                setShowPayslip(true);
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
                setShowPayslip(false);
                dispatch(hideLoading());
            }
        } catch (error) {
            toast.error('Connection Issue', {
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
    }
    return (
        <>
            {loading && <div class="d-flex justify-content-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>}
            {!loading &&
                <div className="employee">
                    <div className="row filter">
                        <div className="col-sm-6 col-md-3 col-lg-3">
                            <div className="form-group form-focus focused">
                                <select className='form-control' name="" id="" onChange={(e) => setFilterData({ ...filterData, employee: e.target.value })}>
                                    <option value="">Select Employee</option>
                                    {employeesDetails ? employeesDetails.map(values => {
                                        return (
                                            <option value={values._id}>{values.firstName} {values.lastName}</option>
                                        )
                                    }) : ('')}
                                </select>
                                <label className='focus-label'>Employee Name</label>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-3 col-lg-3">
                            <div className="form-group form-focus focused">
                                <input type="month" min="2018-01" className='form-control floating' onChange={(e) => setFilterData({ ...filterData, month: e.target.value })} />
                                <label className='focus-label'>Month - Year</label>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-3 col-lg-2">
                            <div className="search-btn">
                                <button className="btn" onClick={handleSearch}>Search</button>
                            </div>
                        </div>
                    </div>
                </div>}
            {showPayslip && <Payslip filtererdResult={filtererdResult} copmpanyData={copmpanyData} loading={loading} />}
        </>

    )
}

export default Filter