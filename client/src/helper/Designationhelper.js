import instance from '../utils/serverConfig';

export async function addDesignation({ designationData }) {
    try {
        const { data } = await instance({
            url: '/api/addDesignation',
            method: 'POST',
            data: {designationData}
        })
        return data;
    } catch (error) {
        return { error: "Internal Server Error" }
    }
}

export async function getAllDesignation() {
    try {
        const { data } = await instance({
            url: '/api/getAllDesignation',
            method: 'GET'
        })
        return data;
    } catch (error) {
        return { error: "Internal Server Error", error: error.message }
    }
}

export async function deleteDesignation(id) {
    try {
        const response = await instance({
            url: '/api/deleteDesignation/?designationId=' + id,
            method: 'DELETE',
        })
        return response;
    } catch (error) {

    }
}

export async function updateDesignation(data) {
    try {
        const response = await instance({
            url: '/api/updateDesignation/',
            method: 'PUT'
        })
    } catch (error) {

    }
}