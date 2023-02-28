import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { getEmployeeCount, getPendingLeaveCount } from '../../helper/Employeehelper'
import { getAllPendingPayrolData, getSalaryPaidMonthWise } from '../../helper/PayrolHelper'
import { hideLoading, showLoading } from '../../redux/features/alertSlice'
import { setGeneratedPayrolData } from '../../redux/features/payrolSlice'
import Attendance from './Attendance'
import Cards from './Cards'
import PageHeader from './PageHeader'
import PayementChart from './PayementChart'
import PendingPayrol from './PendingPayrol'

function Body() {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [pendingLeaveCount, setPendingLeaveCount] = useState(0);
  const [payementChartData, setPaymentChartData] = useState([]);
  const { userDetails } = useSelector(state => state.user);
  const { loading } = useSelector(state => state.alerts);
  const { generatedPayrolData } = useSelector(state => state.payrol);
  const role = userDetails?.role;
  const token = userDetails.UserToken;
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      dispatch(showLoading())
      Promise.all([getEmployeeCount(token), getPendingLeaveCount(token), getAllPendingPayrolData(token), getSalaryPaidMonthWise(token)])
        .then(([response1, response2, response3, response4]) => {
          if (response1.success && response2.success && response3.success && response4.success) {
            setEmployeeCount(response1?.count);
            setPendingLeaveCount(response2?.count);
            setPaymentChartData(response4?.result);
            dispatch(setGeneratedPayrolData(response3?.payrolData));
            dispatch(hideLoading());
          } else {
            toast.error(response1?.message || response2?.message, {
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
        })
    })();
  }, []);

  return (
    <div className="section-body">
      <PageHeader />
      {loading &&
        <>
          <div class="d-flex justify-content-center">
            <div class="spinner-border text-primary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </>}
      {!loading &&
        <>
          {role === 'Admin' &&
            <>
              <Cards employeeCount={employeeCount} pendingLeaveCount={pendingLeaveCount} />

              <div className="row dashboard">
                <PendingPayrol generatedPayrolData={generatedPayrolData} />
                <PayementChart payementChartData={payementChartData} />
              </div>
            </>
          }

          {(role === 'Employee' || role === 'HR') &&
            <Attendance token={token} />
          }
        </>}


    </div>
  )
}

export default Body