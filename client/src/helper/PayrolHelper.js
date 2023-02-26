import instance from "../utils/serverConfig"

export const getAllPendingPayrolData = async (token) => {
    try {
        const payrolData = await instance({
            url: '/api/payrol/getGeneratedPayrol',
            method: 'GET',
            headers: {
                Authorization: token
            }
        });
        return payrolData.data;
    } catch (error) {
        return { message: 'Connection Error' };
    }
}

export const getPayrolData = async (token, docID, payrolID) => {
    try {
        const payrolData = await instance({
            url: '/api/payrol/getPayrolData',
            method: 'POST',
            data: { docID, payrolID },
            headers: {
                Authorization: token
            }
        });
        return payrolData.data;
    } catch (error) {
        return { message: 'Connection Error' }
    }
}

export const generateEmployeePayslip = async (token, values, payrolDocID, paymentMethod, payrolDataID) => {
    try {
        const payrolData = await instance({
            url: '/api/payrol/generatePayrolSlip',
            method: 'POST',
            data: { values, payrolDocID, paymentMethod, payrolDataID },
            headers: {
                Authorization: token
            }
        });
        return payrolData.data;
    } catch (error) {
        return { message: 'Connection Error' }
    }
}

export const getAllPaidPayrolData = async (token) => {
    try {
        const payrolData = await instance({
            url: '/api/payrol/getPaidPayrols',
            method: 'GET',
            headers: {
                Authorization: token
            }
        });
        return payrolData.data;
    } catch (error) {
        return { message: 'Connection Error' };
    }
}

export const getEmpPayrolData = async (token, filterData) => {
    try {
        const result = await instance({
            url: '/api/payrol/getEmpData',
            method: 'POST',
            data: filterData,
            headers: {
                Authorization: token
            }
        })
        return result.data;
    } catch (error) {
        return { message: 'Connection Error' };
    }
}