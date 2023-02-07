import instance from "../utils/serverConfig"

export const addJobRoleLeaves = async (values)=>{
    try {
        const addJobRoleLeaves = await instance({
            url: '/api/leave/jobRoleLeave/add',
            method: 'POST',
            data: values
        })
        return addJobRoleLeaves.data;
    } catch (error) {
        return {message: 'Connection Error..!'};        
    }
}

export const getAllJobRolesLeavesData = async ()=>{
    try {
        const addJobRoleLeaves = await instance({
            url: '/api/leave/jobRoleLeave/getAll',
            method: 'GET'
        })
        return addJobRoleLeaves.data;
    } catch (error) {
        console.log(error.message);
        return {message: 'Connection Error..!'};    
    }
}