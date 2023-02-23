import instance from "../utils/serverConfig"

export const applyLeave = async (datas, days, token) => {
    const leaveDetails = {
        leaveType: datas.leaveType,
        applyDate: datas.applyDate,
        fromDate: datas.fromDate,
        toDate: datas.toDate,
        modeOfLeave: datas.modeOfLeave,
        days: days
    }
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

export const getUserLeaveApplications = async (token) => {
    try {
        const getLeaveApplications = await instance({
            url: '/api/leave/userLeaveApplications',
            method: 'GET',
            headers: {
                Authorization: token
            }
        })
        return getLeaveApplications.data;
    } catch (error) {
        return { message: 'Connection Error..!' }
    }
}

export const getAllLeaveApplications = async (token) => {
    try {
        const getApplications = await instance({
            url: '/api/leave/allApplications/get',
            method: 'GET',
            headers: {
                Authorization: token
            }
        })
        return getApplications.data;
    } catch (error) {
        return { message: 'Connection Error' };
    }
}

export const updateLeaveStatus = async (status, docID, applicationsID, token, empID) => {
    const data = {
        status: status,
        docID: docID,
        applicationID: applicationsID,
        empID: empID
    }
    console.log(data);
    try {
        const updateLeaveApplications = await instance({
            url: '/api/leave/allApplications/updateStatus',
            method: 'PUT',
            data: data,
            headers: {
                Authorization: token
            }
        })
        return updateLeaveApplications.data;
    } catch (error) {
        console.log(error.message);
        return { message: 'Connection Error' };
    }
}