import instance from "../utils/serverConfig";

export async function addDepartment({ department }) {
    try {
        const { data } = await instance({
            url: '/api/addDepartment',
            method: 'POST',
            data: {department}
        })
        return data
    } catch (error) {
        return { error: "Not Added" };
    }
}

export async function getAllDepartments() {
    try {
        const { data } = await instance({
            url: '/api/getAllDepartments',
            method: 'GET',
        })
        return data
    } catch (error) {
    }
}

export async function deleteDepartment(id) {
    try {
        const response = await instance({
            url: '/api/deleteDepartment?id=' + id,
            method: 'DELETE'
        })
        return response.data;
    } catch (error) {
    }
}

export async function updateDepartment(id, value) {
    try {
        const response = await instance({
            url: '/api/updateDepartment?id=' + id + '&&text=' + value,
            method: 'PUT'
        })
        return response.data;
    } catch (error) {
    }
}