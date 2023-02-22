import instance from "../utils/serverConfig"

export const addAttendance = async (values,token) => {
    try {
        const add = await instance({
            url: '/api/attendance/add',
            method: 'POST',
            data: values,
            headers:{
                Authorization : token
            }
        })
        return add.data
    } catch (error) {
        return { message: 'Connection Problem..!' }
    }
}

export const attendanceList = async (token) => {
    try {
        const getList = await instance({
            url: '/api/attendance/getAll',
            method: 'GET',
            headers:{
                Authorization : token
            }
        })
        return getList.data
    } catch (error) {
        return { message: 'Connection Problem..!' }
    }
}

export const deletAttendance = async (id,token,empID) => {
    try {
        const deleteStatus = await instance({
            url: '/api/attendance/delete/' + id,
            method: 'DELETE',
            data: {empID},
            headers:{
                Authorization : token
            }
        })
        return deleteStatus.data
    } catch (error) {
        return { message: 'Connection Problem..!' }
    }
}

export const getAttendanceData = async (id,token) => {
    try {
        const getData = await instance({
            url: '/api/attendance/getData/' + id,
            method: 'GET',
            headers:{
                Authorization : token
            }
        })
        return getData.data;
    } catch (error) {
        return { message: 'Connection Problem..!' }
    }
}

export const updateAttendance = async (data,token) => {
    try {
        const update = await instance({
            url: '/api/attendance/update',
            method: 'PUT',
            data: data,
            headers:{
                Authorization : token
            }
        })
        return update.data
    } catch (error) {
        return { message: 'Connection Problem..!' }
    }
}

export const punchIn = async (token)=>{
    try {
        const punchin = await instance({
            url: '/api/attendance/punchin',
            method: 'POST',
            headers:{
                Authorization: token
            }
        })
        return punchin.data;
    } catch (error) {
        return { message: 'Connection Problem..!' }
    }
}

export const punchOut = async (token)=>{
    try {
        const punchout = await instance({
            url: '/api/attendance/punchout',
            method: 'POST',
            headers:{
                Authorization: token
            }
        })
        return punchout.data;
    } catch (error) {
        return { message: 'Connection Problem..!' }
    }
}

export const getPunchingData = async (token)=>{
    try {
        const punchedData = await instance({
            url: '/api/attendance/getPunchedData',
            method: 'GET',
            headers:{
                Authorization: token
            }
        })
        return punchedData.data;
    } catch (error) {
        return { message: 'Connection Problem..!' }
    }
}