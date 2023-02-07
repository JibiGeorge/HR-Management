import instance from "../utils/serverConfig"

export const addJobRoleLeaves = async (values, token) => {
    try {
        const addJobRoleLeaves = await instance({
            url: '/api/leave/jobRoleLeave/add',
            method: 'POST',
            data: values,
            headers: {
                Authorization: token
            }
        })
        return addJobRoleLeaves.data;
    } catch (error) {
        return { message: 'Connection Error..!' };
    }
}

export const getAllJobRolesLeavesData = async (token) => {
    try {
        const addJobRoleLeaves = await instance({
            url: '/api/leave/jobRoleLeave/getAll',
            method: 'GET',
            headers: {
                Authorization: token
            }
        })
        return addJobRoleLeaves.data;
    } catch (error) {
        return { message: 'Connection Error..!' };
    }
}