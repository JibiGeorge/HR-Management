import instance from "../utils/serverConfig"

export const employeeCrendentialGenerate = async (id,token) =>{
    try {
        const generate = await instance({
            url: '/api/employee/credentialGenrate/'+id,
            method: 'POST',
            headers: {
                Authorization: token
            }
        })
        return generate.data;
    } catch (error) {
        return {message: 'Connection Error. Please Try Again.'}
    }
}

export const employeeCrendentialReGenerate = async (id,token) => {
    try {
        const generate = await instance({
            url: '/api/employee/credential/reGenerate/'+id,
            method: 'PUT',
            headers: {
                Authorization: token
            }
        })
        return generate.data;
    } catch (error) {
        return {message: 'Connection Error. Please Try Again.'}
    }
}