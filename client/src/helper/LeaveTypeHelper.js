import instance from "../utils/serverConfig"

export const addLeaveTypes = async (values, token) => {
    try {
        const add = await instance({
            url: '/api/leaveType/add',
            method: 'POST',
            data: values,
            headers: {
                Authorization: token
            }
        })
        return add.data
    } catch (error) {
        return { message: 'Server Connection Failed' }
    }
}

export const getAllLeaveTypes = async (token) => {
    try {
        const getAllList = await instance({
            url: '/api/leaveType/getAll',
            method: 'GET',
            headers: {
                Authorization: token
            }
        })
        return getAllList.data
    } catch (error) {
        return { message: 'Server Connection Failed' }
    }
}

export const deleteLeaveType = async (id, token) => {
    try {
        const deleted = await instance({
            url: '/api/leaveType/delete/' + id,
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        })
        return deleted.data
    } catch (error) {
        return { message: 'Server Connection Failed' }
    }
}

export const getUpdaingData = async (id, token) => {
    try {
        const data = await instance({
            url: '/api/leaveType/getLeaveTypeData/' + id,
            method: 'GET',
            headers: {
                Authorization: token
            }
        })
        return data.data
    } catch (error) {
        return { message: 'Server Connection Failed' }
    }
}

export const leaveTypeUpdate = async (values, token) => {
    try {
        const update = await instance({
            url: '/api/leaveType/update/',
            method: 'PUT',
            data: values,
            headers: {
                Authorization: token
            }
        })
        return update.data
    } catch (error) {
        return { message: 'Server Connection Failed' }
    }
}