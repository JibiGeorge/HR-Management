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
        response.data.data.dateofBirth = new Date(response.data.data.dateofBirth).toLocaleDateString('en-GB', {
            day: 'numeric', month: 'short', year: 'numeric'
        });
        response.data.data.dateofJoin = new Date(response.data.data.dateofJoin).toLocaleDateString('en-GB', {
            day: 'numeric', month: 'short', year: 'numeric'
        });
        
        response.data.data.dateofLeave = new Date(response.data.data.dateofLeave).toLocaleDateString('en-GB', {
            day: 'numeric', month: 'short', year: 'numeric'
        });
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
        console.log(result);
        if(result.sucess){
            return (result)
        }else{
            return (result)
        }
    } catch (error) {        
        return ({message :"internal"})        
    }
}