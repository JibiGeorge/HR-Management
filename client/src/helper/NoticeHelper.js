import axios from 'axios';
import instance from '../utils/serverConfig';

export const addNotice = async (values, token) => {
    const data = new FormData();
    data.append('file', values.file);
    data.append('upload_preset', 'opkf0ic5')
    data.append('cloud_name', 'dq9kanqi3');
    try {
        const upload = await axios.post('https://api.cloudinary.com/v1_1/dq9kanqi3/image/upload', data)
        if (upload.status === 200) {
            values.file = upload.data.url;
            const response = await instance({
                url: '/api/notice/add',
                method: 'POST',
                data: values,
                headers: {
                    Authorization: token
                }
            })
            return response.data;
        } else {
            return { message: 'File Uploading failed' }
        }
    } catch (error) {
        if(error.message === 'Network Error'){
            return { message: 'Network Error..! Please Check you Internet Connection..'}
        }else{
            return { message: 'Intrernal Server Connection Error..!' }
        }
    }
}

export const getAllNotices = async (token) => {
    try {
        const allNotices = await instance({
            url: '/api/notice/allNotices',
            method: 'GET',
            headers: {
                Authorization: token
            }
        })
        return allNotices.data;
    } catch (error) {
        return { message: 'Intrernal Server Connection Error..!' }
    }
}

export const mailSend = async (token, noticeDetails, noticeTo) => {
    try {
        const sendNotice = await instance({
            url: '/api/notice/sendNotices/',
            method: 'POST',
            data: { noticeDetails, noticeTo },
            headers: {
                Authorization: token
            }
        })
        return sendNotice.data;
    } catch (error) {
        return { message: 'Intrernal Server Connection Error..!' };
    }
}

export const deleteNotice = async (token, id)=>{
    try {
        const noticeDelete = await instance({
            url: '/api/notice/delete/'+id,
            method: 'DELETE',
            headers:{
                Authorization: token
            }
        })
        return noticeDelete.data;
    } catch (error) {
        return { message: 'Intrernal Server Connection Error..!' };
    }
}