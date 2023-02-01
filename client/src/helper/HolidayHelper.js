import instance from "../utils/serverConfig"

export async function addHoliday (data){
    try {
        const add = await instance({
            url: '/api/holiday/add',
            method: 'POST',
            data: data
        })
        return add.data
    } catch (error) {
        return { error: "Internal Server Error" }
    }    
}

export const getAllHolidays = async ()=>{
    try {
        const allHolidays = await instance({
            url: '/api/holidays/getAll',
            method: 'GET'
        })
        return allHolidays.data
    } catch (error) {
        return { error: "Internal Server Error" }        
    }
}

export const deleteHoliday = async (id) =>{
    try {
        const deleteHoliday = await instance({
            url: '/api/holidays/delete/'+id,
            method: 'DELETE'
        })
        return deleteHoliday.data
    } catch (error) {
        return { error: "Internal Server Error" }
    }
}

export const getHolidayData = async (id) =>{
    try {
        const HolidayData = await instance({
            url: '/api/holidays/getData/'+id,
            method: 'GET'
        })
        return HolidayData.data
    } catch (error) {
        return { error: "Internal Server Error" }
    }
}

export const updateHoliday = async (data)=>{
    try {
        const updateData = await instance({
            url: '/api/holidays/update',
            method: 'PUT',
            data: data
        })
        return updateData.data
    } catch (error) {
        return { error: "Internal Server Error" }
    }
}