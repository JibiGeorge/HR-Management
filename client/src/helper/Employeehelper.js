import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8080";

export const addEmployee = async (values) => {
    const data = new FormData();
    data.append('file', values.image)
    data.append('upload_preset', 'opkf0ic5')
    data.append('cloud_name', 'dq9kanqi3');


    try {
        const upload = await axios.post('https://api.cloudinary.com/v1_1/dq9kanqi3/image/upload',data)
        console.log('status',upload);
        if(upload.status === 200){
            values.image = upload.data.url;
            const response = await axios.post('/api/employee/add', { values });
            return response;
        }else{
        }
    } catch (error) {
        console.log('====>',error.message);        
    }

    // try {
    //     fetch('https://api.cloudinary.com/v1_1/dq9kanqi3/image/upload', {
    //         method: 'POST',
    //         body: data
    //     }).then((res) => res.json())
    //         .then(async(data) => {
    //             values.image = data.url
    //             console.log(values.image);
    //             const response = await axios.post('/api//employee/add', { values });
    //             console.log('ressss',response);
    //             return response;
    //         }).catch((error) => {
    //             console.log('====>',error.message);
    //             res.send({ error: error.message })
    //         })
    // } catch (error) {
    //     return { error: "Internal Server Error...!" };
    // }

}

export const getAllEmployees = async () => {
    try {
        const response = await axios.get('/api/employee/getAllEmployees');
        console.log('response',response.data);
        return response.data;
    } catch (error) {
        return { error: "Internal Server Error...!", err: error.message };
    }
}