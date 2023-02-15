import instance from "../utils/serverConfig"

export const addEmployeeSalary = async (token, empID, values) => {
    try {
        const add = await instance({
            url: '/api/employee/salary/add/' + empID,
            method: 'POST',
            data: values,
            headers: {
                Authorization: token
            }
        });
        return add.data;
    } catch (error) {
        return { message: 'Server Connection Failed..!' };
    }
};

export const getSalaryData = async (token, empID)=>{
    try {
        const getData = await instance({
            url: '/api/employee/salary/get/'+empID,
            method: 'GET',
            headers:{
                Authorization: token
            }
        })
        return getData.data;
    } catch (error) {
        return { message: 'Server Connection Failed..!' };
    }
}

export const deleteSalaryData = async (token,salaryDetailsID)=>{
    try {
        const dataDelete = await instance({
            url: '/api/employee/salaryDetails/delete/'+salaryDetailsID,
            method: 'DELETE',
            headers:{
                Authorization: token
            }
        })
        return dataDelete.data;
    } catch (error) {
        return { message: 'Server Connection Failed..!' };
    }
}