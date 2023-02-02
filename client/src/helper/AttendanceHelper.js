import instance from "../utils/serverConfig"

export const addAttendance = async (values)=>{
    try {
        const add = await instance({
            url: '/api/attendance/add',
            method: 'POST',
            data: values
        })
        return add.data
    } catch (error) {
        return {message: 'Connection Problem..!'}   
    }
}

export const attendanceList = async ()=>{
    try {
        const getList = await instance({
            url: '/api/attendance/getAll',
            method: 'GET'
        })
        return getList.data        
    } catch (error) {
        return {message: 'Connection Problem..!'}   
    }
}