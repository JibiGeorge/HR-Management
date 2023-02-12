import instance from "../utils/serverConfig"

export const employeeCrendentialGenerate = async (id, token) => {
    try {
        const generate = await instance({
            url: '/api/employee/credentialGenrate/' + id,
            method: 'POST',
            headers: {
                Authorization: token
            }
        })
        return generate.data;
    } catch (error) {
        return { message: 'Connection Error. Please Try Again.' }
    }
}

export const employeeCrendentialReGenerate = async (id, token) => {
    try {
        const generate = await instance({
            url: '/api/employee/credential/reGenerate/' + id,
            method: 'PUT',
            headers: {
                Authorization: token
            }
        })
        return generate.data;
    } catch (error) {
        return { message: 'Connection Error. Please Try Again.' }
    }
}

export const updateCredentialPassword = async (values, id, token) => {
    console.log(values,token,id);
    try {
        const update = await instance({
            url: '/api/employee/changePassword/' + id,
            method: 'PUT',
            data: values,
            headers: {
                Authorization: token
            }
        });
        return update.data;
    } catch (error) {
        console.log(error.message);
        return { message: 'Connection Error. Please Try Again.' }
    }
}