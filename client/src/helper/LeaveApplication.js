import instance from "../utils/serverConfig"

export const applyLeave = async (datas,days, token) => {
    const leaveDetails = {
        leaveType: datas.leaveType,
        applyDate: datas.applyDate,
        fromDate: datas.fromDate,
        toDate: datas.toDate,
        modeOfLeave: datas.modeOfLeave,
        days: days }
    try {
        const apply = await instance({
            url: '/api/leave/applyLeave',
            method: 'POST',
            data: leaveDetails,
            headers: {
                Authorization: token
            }
        })
        return apply.data;
    } catch (error) {
        return { message: 'Connection Error..!' }
    }
}

export const getUserLeaveApplications = async (token)=>{
    try {
        const getLeaveApplications = await instance({
            url: '/api/leave/userLeaveApplications',
            method: 'GET',
            headers:{
                Authorization: token
            }
        })
        return getLeaveApplications.data;
    } catch (error) {
        return {message: 'Connection Error..!'}
    }
}