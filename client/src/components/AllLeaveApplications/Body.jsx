import React, { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { getAllLeaveApplications } from '../../helper/LeaveApplication'
import { hideLoading, showLoading } from '../../redux/features/alertSlice'
import { setAllEmployeeLeaveApplications } from '../../redux/features/leaveApplicationsSlice'
import ApplicationsList from './ApplicationsList'
import PageHeader from './PageHeader'

const Body = () => {
  const dispatch = useDispatch();
  const { userDetails } = useSelector(state => state.user);
  const { allEmployeeLeaveApplications } = useSelector(state => state.leaveApplications);
  const token = userDetails.UserToken;

  useEffect(() => {
    (async () => {
      dispatch(showLoading());
      try {
        const allLeaveApplications = await getAllLeaveApplications(token)
        if (allLeaveApplications.success) {
          dispatch(setAllEmployeeLeaveApplications(allLeaveApplications?.applications));
          dispatch(hideLoading());
        } else {
          toast.error(allLeaveApplications.message, {
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
        toast.error('Network Error..!', {
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
  return (
    <div className="section-body">
      <PageHeader />
      <ApplicationsList applications={allEmployeeLeaveApplications} />
    </div>
  )
}

export default Body