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
            data: {docID,payrolID},
            headers: {
                Authorization: token
            }
        });
        return payrolData.data;
    } catch (error) {
        return { message: 'Connection Error' }
    }
}

export const generateEmployeePayslip = async (token, bankDetails, payrolDocID,paymentMethod,payrolDataID)=>{
    try {
        const payrolData = await instance({
            url: '/api/payrol/generatePayrolSlip',
            method: 'POST',
            data: {bankDetails, payrolDocID,paymentMethod,payrolDataID},
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
        console.log(error.message);
        return { message: 'Connection Error' };
    }
}