import axios from "axios";
import instance from "../utils/serverConfig";

export const updateDetails = async (token, values) => {
    const data = new FormData();
    data.append('file', values.logo)
    data.append('upload_preset', 'opkf0ic5')
    data.append('cloud_name', 'dq9kanqi3');
    try {
        const upload = await axios.post('https://api.cloudinary.com/v1_1/dq9kanqi3/image/upload', data)
        if (upload.status === 200) {
            values.logo = upload.data.url;
            const update = await instance({
                url: '/api/companyProfile/update',
                method: 'PUT',
                data: values,
                headers: {
                    Authorization: token
                }
            })
            return update.data;
        } else {
            return { message: 'Image Upload Failed' };
        }
    } catch (error) {
        return { message: 'Server Connection Failed' };
    }
}

export const getCompanyProfile = async (token) => {
    try {
        const profileData = await instance({
            url: '/api/companyProfile/getDetails',
            method: 'GET',
            headers: {
                Authorization: token
            }
        })
        return profileData.data;
    } catch (error) {
        return { message: 'Server Connection Failed' }
    }
}

export const getCompanyIcon = async () => {
    try {
        const icon = await instance({
            url: '/api/companyProfile/getIcon',
            method: 'GET'
        })
        return icon.data
    } catch (error) {
        return { message: 'Server Connection Failed' }
    }
}