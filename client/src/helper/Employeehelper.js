import axios from 'axios';
import instance from '../utils/serverConfig';

export const addEmployee = async (values) => {
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
                data: {values}
            })
            return response;
        } else {
        }
    } catch (error) {
        console.log('====>', error.message);
    }
}

export const getAllEmployees = async () => {
    try {
        const response = await instance({
            url: '/api/employee/getAllEmployees',
            method: 'GET'
        })
        return response.data;
    } catch (error) {
        return { error: "Internal Server Error...!", err: error.message };
    }
}

export const getEmployeeData = async (empID) => {
    try {
        const response = await instance({
            url: '/api/employee/getEmployeeData/?id=' + empID,
            method: 'GET'
        })
        return (response)
    } catch (error) {
        return { error: "Internal Server Error...!" }
    }
}

export const updateProfile = async (data, userID)=>{
    try {
        const updateprofileStatus = await instance({
            url: '/api/employee/updateProfile/?id='+userID,
            method: 'PUT',
            data: data
        })
        const result = updateprofileStatus.data
        if(result.sucess){
            return (result)
        }else{
            return (result)
        }
    } catch (error) {
        return { error: "Internal Server Error...!" }
    }
}

export const updateEmpPersonal = async (datas, empID)=>{
    try {
        const updatePersonalInfo = await instance({
            url: '/api/employee/personalinfo/update/'+empID,
            method: 'PUT',
            data: datas
        }) 
        return updatePersonalInfo.data;
    } catch (error) {
        return {message: "Connection Error"};
    }
}

export const getEmployeeAddressData = async (id)=>{
    try {
        const getData = await instance({
            url: '/api/employee/address/'+id,
            method: 'GET'
        })
        return getData.data;
    } catch (error) {
        return {message: "Connection Error..!"}
    }
}

export const employeeAddressAdd = async (datas, id)=>{
    try {
        const addAddress = await instance({
            url: '/api/employee/address/add/'+id,
            method: 'POST',
            data: datas
        })
        return addAddress.data;
    } catch (error) {
        console.log('error',error.message);
        return {message: "Connection Error..!"}
    }
}

export const getBankAccount = async (id)=>{
    try {
        const getAccountData = await instance({
            url: '/api/employee/bankAccount/get/'+id,
            method: 'GET'
        })
        return getAccountData.data
    } catch (error) {
        return {message: 'Connection Error'};
    }
}

export const updateBankAccount = async (datas, empID)=>{
    try {
        const update = await instance({
            url: '/api/employee/bankAccount/add/'+empID,
            method: 'PUT',
            data: datas
        })
        return update.data;
    } catch (error) {
        return {message: 'Connection Error'};
    }
}