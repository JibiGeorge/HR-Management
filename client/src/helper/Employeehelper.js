import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8080";

export const addEmployee = async (values) => {
    try {
        const response = await axios.post('/api//employee/add', { values });
        return response;
    } catch (error) {
        return { error: "Internal Server Error...!" };
    }

}

export const getAllEmployees = async () => {
    try {
        const response = await axios.get('/api/employee/getAllEmployees');
        return response;
    } catch (error) {
        return { error: "Internal Server Error...!", err: error.message };
    }
}