import instance from "../utils/serverConfig"

export const addAttendance = async (values) => {
    try {
        const add = await instance({
            url: '/api/attendance/add',
            method: 'POST',
            data: values
        })
        return add.data
    } catch (error) {
        return { message: 'Connection Problem..!' }
    }
}

export const attendanceList = async () => {
    try {
        const getList = await instance({
            url: '/api/attendance/getAll',
            method: 'GET'
        })
        return getList.data
    } catch (error) {
        return { message: 'Connection Problem..!' }
    }
}

export const deletAttendance = async (id) => {
    try {
        const deleteStatus = await instance({
            url: '/api/attendance/delete/' + id,
            method: 'DELETE'
        })
        return deleteStatus.data
    } catch (error) {
        return { message: 'Connection Problem..!' }
    }
}

export const getAttendanceData = async (id) => {
    try {
        const getData = await instance({
            url: '/api/attendance/getData/' + id,
            method: 'GET'
        })
        return getData.data;
    } catch (error) {
        return { message: 'Connection Problem..!' }
    }
}

export const updateAttendance = async (data) => {
    try {
        const update = await instance({
            url: '/api/attendance/update',
            method: 'PUT',
            data: data
        })
        return update.data
    } catch (error) {
        return { message: 'Connection Problem..!' }
    }
}