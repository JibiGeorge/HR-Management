import instance from "../utils/serverConfig"

export async function addHoliday(data, token) {
    try {
        const add = await instance({
            url: '/api/holiday/add',
            method: 'POST',
            data: data,
            headers: {
                Authorization: token
            }
        })
        return add.data
    } catch (error) {
        return { error: "Internal Server Error" }
    }
}

export const getAllHolidays = async (token) => {
    try {
        const allHolidays = await instance({
            url: '/api/holidays/getAll',
            method: 'GET',
            headers: {
                Authorization: token
            }
        })
        return allHolidays.data
    } catch (error) {
        return { error: "Internal Server Error" }
    }
}

export const deleteHoliday = async (id, token) => {
    try {
        const deleteHoliday = await instance({
            url: '/api/holidays/delete/' + id,
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        })
        return deleteHoliday.data
    } catch (error) {
        return { error: "Internal Server Error" }
    }
}

export const getHolidayData = async (id, token) => {
    try {
        const HolidayData = await instance({
            url: '/api/holidays/getData/' + id,
            method: 'GET',
            headers: {
                Authorization: token
            }
        })
        return HolidayData.data
    } catch (error) {
        return { error: "Internal Server Error" }
    }
}

export const updateHoliday = async (data, token) => {
    try {
        const updateData = await instance({
            url: '/api/holidays/update',
            method: 'PUT',
            data: data,
            headers: {
                Authorization: token
            }
        })
        return updateData.data
    } catch (error) {
        return { error: "Internal Server Error" }
    }
}