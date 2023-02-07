import instance from "../utils/serverConfig"

export const employeeCrendentialGenerate = async (id) =>{
    try {
        const generate = await instance({
            url: '/api/employee/credentialGenrate/'+id,
            method: 'POST'
        })
        return generate.data;
    } catch (error) {
        return {message: 'Connection Error. Please Try Again.'}
    }
}

export const employeeCrendentialReGenerate = async (id) => {
    try {
        const generate = await instance({
            url: '/api/employee/credential/reGenerate/'+id,
            method: 'PUT'
        })
        return generate.data;
    } catch (error) {
        return {message: 'Connection Error. Please Try Again.'}
    }
}