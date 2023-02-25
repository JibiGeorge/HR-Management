import cron from 'node-cron';
import moment from 'moment-timezone'
import Employee from '../model/employee.js';
import SalaryModel from '../model/salaryModel.js';
import AttendanceModel from '../model/attendance.js';
import PayrolModel from '../model/payrolModel.js';
import mongoose from 'mongoose';
import EmployeeBankAccount from '../model/bankAccountModel.js';

export const payrolAutoGenerate = async () => {
    try {
        // Get the previous month's start and end dates in the "America/New_York" timezone
        const previousMonthStartDate = moment.tz().subtract(1, 'months').startOf('month').toDate();
        const previousMonthEndDate = moment.tz().subtract(1, 'months').endOf('month').toDate();
        // Get the name of the month for the payroll
        const payrollMonth = moment.tz().subtract(1, 'months').startOf('month').format('MM-YYYY');

        // Getting all the employees whose active in the list
        const employeeList = await Employee.find({ status: 'Active' })
        employeeList.map(async (employee) => {
            const empID = employee._id;
            const salaryData = await SalaryModel.aggregate([
                { $match: { userID: empID } },
                { $unwind: '$salaryDetails' },
                {
                    $match: {
                        "salaryDetails.fromDate": { $lte: previousMonthEndDate },
                        $or: [
                            { "salaryDetails.toDate": null },
                            { "salaryDetails.toDate": { $gte: previousMonthStartDate } }
                        ]
                    }
                }
            ])
            if (salaryData.length >= 1) {
                const leaveCount = await AttendanceModel.aggregate([
                    {
                        $match: {
                            "month": payrollMonth,
                            "attendance.employeeID": empID
                        }
                    },
                    {
                        $unwind: "$attendance"
                    },
                    {
                        $match: {
                            "attendance.employeeID": empID
                        }
                    },
                    {
                        $unwind: "$attendance.attendanceDetails"
                    },
                    {
                        $match: {
                            "attendance.attendanceDetails.status": "Leave"
                        }
                    },
                    {
                        $group: {
                            _id: "$attendance.employeeID",
                            totalLeaves: { $sum: 1 }
                        }
                    }
                ])
                const totalLeaves = leaveCount[0]?.totalLeaves ? leaveCount[0]?.totalLeaves : 0;
                const salaryType = salaryData[0].salaryDetails?.salaryType;
                const totalSalary = salaryData[0].salaryDetails?.totalSalary;
                const basicSalary = salaryData[0].salaryDetails?.basicSalary;
                const taxType = employee?.taxType;
                if (salaryType === "Monthly") {
                    const perdaySalary = totalSalary / 30;
                    const totalWorkingDays = 30 - totalLeaves;
                    const grossSalary = perdaySalary * totalWorkingDays;
                    if (taxType === "EPF") {
                        const EPF = (basicSalary * 12) / 100;
                        const employeerESI = (basicSalary * 3.25) / 100;
                        const employeeESI = (basicSalary * 0.75) / 100;
                        const netPayable = grossSalary - EPF - employeeESI;
                        const obj = {
                            employeeName: empID,
                            salary: totalSalary,
                            totalLeaves: totalLeaves,
                            grossSalary: Math.round(grossSalary),
                            employeePF: Math.round(EPF),
                            employeerPF: Math.round(EPF),
                            employeeESI: Math.round(employeeESI),
                            employeerESI: Math.round(employeerESI),
                            netPayable: Math.round(netPayable),
                            status: 'UnPaid'
                        }
                        const exist = await PayrolModel.find({ month: payrollMonth })
                        if (!exist) {
                            const payrolData = new PayrolModel({
                                month: payrollMonth,
                                payrolData: obj
                            })
                            payrolData.save()
                        } else {
                            const dataExist = await PayrolModel.findOne({ $and: [{ month: payrollMonth }, { 'payrolData.employeeName': empID }] })
                            if (!dataExist) {
                                await PayrolModel.findOneAndUpdate({
                                    $and: [
                                        { month: payrollMonth }
                                    ]
                                },
                                    {
                                        $push: {
                                            payrolData: obj
                                        }
                                    }
                                )
                            }
                        }
                    } else if (taxType === "TDS") {
                        let TDSAmount = 0;
                        if (grossSalary < 20000) {
                            TDSAmount = (grossSalary * 1) / 100;
                        }
                        const netPayable = Math.round(grossSalary - TDSAmount);
                        const obj = {
                            employeeName: empID,
                            salary: Math.round(totalSalary),
                            totalLeaves: Math.round(totalLeaves),
                            grossSalary: Math.round(grossSalary),
                            TDSAmount: Math.round(TDSAmount),
                            netPayable: Math.round(netPayable),
                            status: 'UnPaid'
                        }
                        const exist = await PayrolModel.findOne({ month: payrollMonth })
                        if (!exist) {
                            const payrolData = new PayrolModel({
                                month: payrollMonth,
                                payrolData: obj
                            })
                            payrolData.save()
                        } else {
                            const dataExist = await PayrolModel.findOne({ $and: [{ month: payrollMonth }, { 'payrolData.employeeName': empID }] })
                            if (!dataExist) {
                                await PayrolModel.findOneAndUpdate({
                                    $and: [
                                        { month: payrollMonth }
                                    ]
                                },
                                    {
                                        $push: {
                                            payrolData: obj
                                        }
                                    }
                                )
                            }
                        }
                    }
                }
            }
        })
    } catch (error) {
        console.log(error.message);
    }
}

export const getGeneratedPayrol = async (req, res) => {
    try {
        const payrolData = await PayrolModel.aggregate([
            { $unwind: '$payrolData' },
            { $match: { 'payrolData.status': 'UnPaid' } },
            {
                $lookup: {
                    from: 'employees',
                    localField: 'payrolData.employeeName',
                    foreignField: '_id',
                    as: 'employeeDetails'
                }
            }
        ]);
        res.status(200).json({ success: true, payrolData });
    } catch (error) {
        res.json({ message: 'Internal Server Error' });
    }
}

export const getPayrolData = async (req, res) => {
    const { docID, payrolID } = req.body;
    try {
        const payrolData = await PayrolModel.aggregate([
            { $match: { _id: mongoose.Types.ObjectId(docID) } },
            { $unwind: '$payrolData' },
            { $match: { 'payrolData._id': mongoose.Types.ObjectId(payrolID) } },
            {
                $lookup: {
                    from: 'employees',
                    localField: 'payrolData.employeeName',
                    foreignField: '_id',
                    as: 'employeeDetails'
                }
            }
        ])
        const employeeID = payrolData[0]?.employeeDetails[0]?._id;
        const bankDetails = await EmployeeBankAccount.findOne({ employee: employeeID });
        res.status(200).json({ success: true, payrolData, bankDetails })
    } catch (error) {
        res.json({ message: 'Internal Server Error' });
    }
}

export const generatePaySlip = async (req, res) => {
    const { bankDetails, payrolDocID, paymentMethod, payrolDataID } = req.body;
    console.log('bankDetails', bankDetails);
    const obj = {
        accountNumber: bankDetails?.accountNumber,
        holderName: bankDetails?.holderName,
        bankName: bankDetails?.bankName,
        branchName: bankDetails?.branchName,
        ifscCode: bankDetails?.ifscCode
    }
    try {
        await PayrolModel.findOneAndUpdate({
            $and: [
                { _id: payrolDocID },
                { 'payrolData._id': payrolDataID },
            ]
        },
            {
                $and: [
                    {
                        $set: {
                            'payrolData.$.paymentMethod': paymentMethod,
                            'payrolData.$.status': 'Paid',
                        }
                    },
                    {
                        $push: {
                            'payrolData.$.bankAccount': obj
                        }
                    }
                ]
            }).then((response) => {
                console.log(response);
            })
    } catch (error) {
        ``
        console.log(error.message);
        res.json({ message: 'Internal Server Error' });
    }
}

export const getPaidPayrolData = async (req, res) => {
    try {
        const payrolData = await PayrolModel.aggregate([
            { $unwind: '$payrolData' },
            { $match: { 'payrolData.status': 'Paid' } },
            {
                $lookup: {
                    from: 'employees',
                    localField: 'payrolData.employeeName',
                    foreignField: '_id',
                    as: 'employeeDetails'
                }
            }
        ]);
        res.status(200).json({ success: true, payrolData });
    } catch (error) {
        res.json({ message: 'Internal Server Error' });
    }
}