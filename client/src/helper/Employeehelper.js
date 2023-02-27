import axios from 'axios';
import instance from '../utils/serverConfig';

export const getEmpCode = async (token) => {
    try {
        const empCode = await instance({
            url: '/api/employee/getEmpCode',
            method: 'GET',
            headers: {
                Authorization: token
            }
        })
        return empCode.data
    } catch (error) {
        return { error: "Internal Server Error...!" };
    }
}

export const addEmployee = async (values, token) => {
    const data = new FormData();
    data.append('file', values.image)
    data.append('upload_preset', 'opkf0ic5')
    data.append('cloud_name', 'dq9kanqi3');

    try {
        const upload = await axios.post('https://api.cloudinary.com/v1_1/dq9kanqi3/image/upload', data)
        if (upload.status === 200) {
            values.image = upload.data.url;
            const response = await instance({
                url: '/api/employee/add',
                method: 'POST',
                data: { values },
                headers: {
                    Authorization: token
                }
            })
            return response;
        } else {
        }
    } catch (error) {
    }
}

export const getAllEmployees = async (token) => {
    try {
        const response = await instance({
            url: '/api/employee/getAllEmployees',
            method: 'GET',
            headers: {
                Authorization: token
            }
        })
        return response.data;
    } catch (error) {
        return { error: "Internal Server Error...!", err: error.message };
    }
}

export const getEmployeeData = async (empID, token) => {
    try {
        const response = await instance({
            url: '/api/employee/getEmployeeData/?id=' + empID,
            method: 'GET',
            headers: {
                Authorization: token
            }
        })
        return (response)
    } catch (error) {
        return { error: "Internal Server Error...!" }
    }
}

export const updateProfile = async (data, userID, token) => {
    try {
        const updateprofileStatus = await instance({
            url: '/api/employee/updateProfile/?id=' + userID,
            method: 'PUT',
            data: data,
            headers: {
                Authorization: token
            }
        })
        const result = updateprofileStatus.data
        if (result.sucess) {
            return (result)
        } else {
            return (result)
        }
    } catch (error) {
        return { error: "Internal Server Error...!" }
    }
}

export const updateEmpPersonal = async (datas, empID, token) => {
    try {
        const updatePersonalInfo = await instance({
            url: '/api/employee/personalinfo/update/' + empID,
            method: 'PUT',
            data: datas,
            headers: {
                Authorization: token
            }
        })
        return updatePersonalInfo.data;
    } catch (error) {
        return { message: "Connection Error" };
    }
}

export const getEmployeeAddressData = async (id, token) => {
    try {
        const getData = await instance({
            url: '/api/employee/address/' + id,
            method: 'GET',
            headers: {
                Authorization: token
            }
        })
        return getData.data;
    } catch (error) {
        return { message: "Connection Error..!" }
    }
}

export const employeeAddressAdd = async (datas, id, token) => {
    try {
        const addAddress = await instance({
            url: '/api/employee/address/add/' + id,
            method: 'POST',
            data: datas,
            headers: {
                Authorization: token
            }
        })
        return addAddress.data;
    } catch (error) {
        return { message: "Connection Error..!" }
    }
}

export const getBankAccount = async (id, token) => {
    try {
        const getAccountData = await instance({
            url: '/api/employee/bankAccount/get/' + id,
            method: 'GET',
            headers: {
                Authorization: token
            }
        })
        return getAccountData.data
    } catch (error) {
        return { message: 'Connection Error' };
    }
}

export const updateBankAccount = async (datas, empID, token) => {
    try {
        const update = await instance({
            url: '/api/employee/bankAccount/add/' + empID,
            method: 'PUT',
            data: datas,
            headers: {
                Authorization: token
            }
        })
        return update.data;
    } catch (error) {
        return { message: 'Connection Error.' };
    }
}

export const getEmergencyContacts = async (empID, token) => {
    try {
        const getContacts = await instance({
            url: '/api/employee/contatcts/get/' + empID,
            method: 'GET',
            headers: {
                Authorization: token
            }
        })
        return getContacts.data;
    } catch (error) {
        return { message: 'Connection Error..!' }
    }
}

export const updateEmployeeContactDetails = async (datas, empID, token) => {
    try {
        const update = await instance({
            url: '/api/employee/contacts/add/' + empID,
            method: 'PUT',
            data: datas,
            headers: {
                Authorization: token
            }
        })
        return update.data
    } catch (error) {
        return { message: 'Connection Error.' }
    }
}

export const updateEducations = async (datas, empID, token) => {
    try {
        const update = await instance({
            url: '/api/employee/eduation/add/' + empID,
            method: 'PUT',
            data: datas,
            headers: {
                Authorization: token
            }
        })
        return update.data
    } catch (error) {
        return { message: 'Connection Error.' };
    }
}

export const allEducationsDetails = async (empID, token) => {
    try {
        const getData = await instance({
            url: '/api/employee/education/get/' + empID,
            method: 'GET',
            headers: {
                Authorization: token
            }
        })
        return getData.data
    } catch (error) {
        return { message: 'Connection Error.' };
    }
}

export const getEmployeeCount = async (token) => {
    try {
        const getCounts = await instance({
            url: '/api/totalEmployeeCount',
            method: 'GET',
            headers: {
                Authorization: token
            }
        })
        return getCounts.data;
    } catch (error) {
        return { message: 'Connection Error.' };
    }
}

export const getPendingLeaveCount = async (token) => {
    try {
        const getCounts = await instance({
            url: '/api/totalPendingLeaveCount',
            method: 'GET',
            headers: {
                Authorization: token
            }
        })
        return getCounts.data;
    } catch (error) {
        return { message: 'Connection Error.' };
    }
}