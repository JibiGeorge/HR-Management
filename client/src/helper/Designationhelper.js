import instance from '../utils/serverConfig';

export async function addDesignation({ designationData, token }) {
    try {
        const { data } = await instance({
            url: '/api/addDesignation',
            method: 'POST',
            data: { designationData },
            headers: {
                Authorization: token
            }
        })
        return data;
    } catch (error) {
        return { error: "Internal Server Error" }
    }
}

export async function getAllDesignation(token) {
    try {
        const { data } = await instance({
            url: '/api/getAllDesignation',
            method: 'GET',
            headers: {
                Authorization: token
            }
        })
        return data;
    } catch (error) {
        return { error: "Internal Server Error", error: error.message }
    }
}

export async function deleteDesignation(id, token) {
    try {
        const response = await instance({
            url: '/api/deleteDesignation/?designationId=' + id,
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        })
        return response;
    } catch (error) {

    }
}

export async function updateDesignation(data, token) {
    try {
        const response = await instance({
            url: '/api/updateDesignation/',
            method: 'PUT',
            headers: {
                Authorization: token
            }
        })
    } catch (error) {

    }
}