import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080"
// axios.create-instance
// add .env file

export async function addDepartment({ department }) {
    try {
        const { data } = await axios.post('/api/addDepartment', { department })
        return data
    } catch (error) {
        return { error: "Not Added" };
    }
}

export async function getAllDepartments() {
    try {
        const { data } = await axios.get('/api/getAllDepartments')
        return data
    } catch (error) {
    }
}

export async function deleteDepartment(id) {
    try {
        const response = await axios.delete('/api/deleteDepartment?id=' + id);
        return response.data;
    } catch (error) {
    }
}

export async function updateDepartment(id, value) {
    try {
        const response = await axios.put('/api/updateDepartment?id=' + id + '&&text=' + value)
        return response.data;
    } catch (error) {
    }
}