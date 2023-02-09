import instance from "../utils/serverConfig";

export async function addDepartment({ department,token }) {
    try {
        const { data } = await instance({
            url: '/api/addDepartment',
            method: 'POST',
            data: {department},
            headers:{
                Authorization : token
            }
        })
        return data
    } catch (error) {
        return { error: "Not Added" };
    }
}

export async function getAllDepartments(token) {
    try {
        const { data } = await instance({
            url: '/api/getAllDepartments',
            method: 'GET',
            headers:{
                Authorization : token
            }
        })
        return data
    } catch (error) {
    }
}

export async function deleteDepartment(id,token) {
    try {
        const response = await instance({
            url: '/api/deleteDepartment?id=' + id,
            method: 'DELETE',
            headers:{
                Authorization : token
            }
        })
        return response.data;
    } catch (error) {
    }
}

export async function updateDepartment(id, value,token) {
    try {
        const response = await instance({
            url: '/api/updateDepartment?id=' + id + '&&text=' + value,
            method: 'PUT',
            headers:{
                Authorization : token
            }
        })
        return response.data;
    } catch (error) {
    }
}