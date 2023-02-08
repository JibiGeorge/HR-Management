import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllLeaveTypes } from '../../helper/LeaveTypeHelper'
import { setLeaveTypes } from '../../redux/features/leaveTypeSlice'
import PageHeader from './PageHeader'

const Body = () => {

  const {userDetails} = useSelector(state => state.user);
  const {leaveType} = useSelector(state => state.leaveType);
  const token = userDetails.UserToken;
  
  const dispatch = useDispatch();

  useEffect(()=>{
    (async()=>{
      const leaveTypes = await getAllLeaveTypes(token);
      if(leaveTypes.success){
        dispatch(setLeaveTypes(leaveTypes.allLeaveTypes));
      }
    })()
  },[])
  return (
    <>
    <div className="section-body">
        <PageHeader leaveType={leaveType} />
    </div>
    </>
  )
}

export default Body