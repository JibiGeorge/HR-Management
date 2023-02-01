import instance from "../utils/serverConfig"

export const addLeaveTypes = async (values) => {
    try {
        const add = await instance({
            url: '/api/leaveType/add',
            method: 'POST',
            data: values
        })
        return add.data
    } catch (error) {
        return { message: 'Server Connection Failed' }
    }
}

export const getAllLeaveTypes = async () => {
    try {
        const getAllList = await instance({
            url: '/api/leaveType/getAll',
            method: 'GET'
        })
        return getAllList.data
    } catch (error) {
        return { message: 'Server Connection Failed' }
    }
}

export const deleteLeaveType = async (id) => {
    try {
        const deleted = await instance({
            url: '/api/leaveType/delete/' + id,
            method: 'DELETE'
        })
        return deleted.data
    } catch (error) {
        return { message: 'Server Connection Failed' }
    }
}

export const getUpdaingData = async (id) => {
    try {
        const data = await instance({
            url: '/api/leaveType/getLeaveTypeData/' + id,
            method: 'GET'
        })
        return data.data
    } catch (error) {
        return { message: 'Server Connection Failed' }
    }
}

export const leaveTypeUpdate = async (values) => {
    try {
        const update = await instance({
            url: '/api/leaveType/update/',
            method: 'PUT',
            data: values
        })
        return update.data
    } catch (error) {
        return { message: 'Server Connection Failed' }
    }
}