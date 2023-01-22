import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8080";

export async function addDesignation({ designationData }) {
    try {
        const { data } = await axios.post('/api/addDesignation', { designationData })
        return data;
    } catch (error) {
        return { error: "Internal Server Error" }
    }
}

export async function getAllDesignation() {
    try {
        const { data } = await axios.get('/api/getAllDesignation')
        return data;
    } catch (error) {
        return { error: "Internal Server Error", error: error.message }
    }
}

export async function deleteDesignation(id) {
    try {
        const response = await axios.delete('/api/deleteDesignation/?designationId=' + id);
        return response;
    } catch (error) {

    }
}

export async function updateDesignation(data) {
    try {
        const response = await axios.put('/api/updateDesignation/')
    } catch (error) {

    }
}