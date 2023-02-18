import React, { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { getUserLeaveApplications } from '../../helper/LeaveApplication'
import { getAllLeaveTypes } from '../../helper/LeaveTypeHelper'
import { hideLoading, showLoading } from '../../redux/features/alertSlice'
import { setUserLeaveApplications } from '../../redux/features/leaveApplicationsSlice'
import { setLeaveTypes } from '../../redux/features/leaveTypeSlice'
import PageHeader from './PageHeader'
import Table from './table'

const Body = () => {

  const { userDetails } = useSelector(state => state.user);
  const { leaveType } = useSelector(state => state.leaveType);
  const { userLeaveApplications } = useSelector(state => state.leaveApplications);
  const token = userDetails.UserToken;

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      dispatch(showLoading());
      const leaveTypes = await getAllLeaveTypes(token);
      const userLeaveApplications = await getUserLeaveApplications(token);
      if (leaveTypes.success) {
        dispatch(setLeaveTypes(leaveTypes.allLeaveTypes));
      }
      if (userLeaveApplications.success) {
        dispatch(setUserLeaveApplications(userLeaveApplications));
        dispatch(hideLoading());
      } else {
        dispatch(setUserLeaveApplications());
        toast.error(userLeaveApplications.message, {
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
    })()
  }, [])
  return (
    <>
      <div className="section-body">
        <PageHeader leaveType={leaveType} />
        <Table applications={userLeaveApplications} />
      </div>
    </>
  )
}

export default Body