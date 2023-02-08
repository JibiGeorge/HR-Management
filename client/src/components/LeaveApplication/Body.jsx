import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserLeaveApplications } from '../../helper/LeaveApplication'
import { getAllLeaveTypes } from '../../helper/LeaveTypeHelper'
import { setUserLeaveApplications } from '../../redux/features/leaveApplicationsSlice'
import { setLeaveTypes } from '../../redux/features/leaveTypeSlice'
import PageHeader from './PageHeader'
import Table from './table'

const Body = () => {

  const {userDetails} = useSelector(state => state.user);
  const {leaveType} = useSelector(state => state.leaveType);
  const {userLeaveApplications} = useSelector(state => state.leaveApplications);
  const token = userDetails.UserToken;
  
  const dispatch = useDispatch();

  useEffect(()=>{
    (async()=>{
      const leaveTypes = await getAllLeaveTypes(token);
      const userLeaveApplications = await getUserLeaveApplications(token);
      if(leaveTypes.success && userLeaveApplications.success){
        dispatch(setLeaveTypes(leaveTypes.allLeaveTypes));
        dispatch(setUserLeaveApplications(userLeaveApplications))
      }
    })()
  },[])
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