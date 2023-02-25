import mongoose from "mongoose";
import AttendanceModel from "../model/attendance.js";
import LeaveApplication from "../model/leaveApplicationModel.js";
import moment from "moment-timezone";

export const applyLeave = async (req, res) => {
    const userID = res.locals.userID;

    const obj = {
        leaveType: req.body.leaveType,
        applyDate: req.body.applyDate,
        fromDate: req.body.fromDate,
        toDate: req.body.toDate,
        modeOfLeave: req.body.modeOfLeave,
        days: req.body.days,
        status: 'Pending'
    }
    try {
        const userExist = await LeaveApplication.findOne({ userID });
        if (userExist) {
            const dataExist = await LeaveApplication.findOne({
                $and: [
                    { 'leaveApplications.leaveType': obj.leaveType },
                    { 'leaveApplications.fromDate': obj.fromDate },
                    { 'leaveApplications.toDate': obj.toDate },
                    { 'leaveApplications.modeOfLeave': obj.modeOfLeave },
                ]
            })
            if (dataExist) {
                res.json({ message: "Data Already Exist..!" });
            } else {
                await LeaveApplication.findOneAndUpdate({ userID }, {
                    $addToSet: {
                        leaveApplications: obj
                    }
                }).then((resposne) => {
                    res.status(200).json({ success: true, message: 'Leave Applied..!' });
                })
            }
        } else {
            const newData = new LeaveApplication({
                userID,
                leaveApplications: obj
            });
            newData.save().then((resposne) => {
                res.status(200).json({ success: true, message: 'Leave Applied..!' });
            });
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error..!' });
    }
}

export const getUserLeaveApplications = async (req, res) => {
    const userID = res.locals.userID;
    try {
        const applications = await LeaveApplication.findOne({ userID }).populate('leaveApplications.leaveType');
        if (applications?.leaveApplications.length > 0) {
            res.status(200).json({ success: true, applications });
        } else {
            res.json({ message: 'No Data Founded..' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error..!' });
    }
}

export const getAllApplications = async (req, res) => {
    try {
        const applications = await LeaveApplication.aggregate([
            {
                $unwind: '$leaveApplications'
            },
            {
                $lookup: {
                    from: 'leavetypes',
                    localField: 'leaveApplications.leaveType',
                    foreignField: '_id',
                    as: 'leaveTypeDetails'
                }
            },
            {
                $lookup: {
                    from: 'employees',
                    localField: 'userID',
                    foreignField: '_id',
                    as: 'employeeDetails'
                }
            }
        ]);
        if (applications.length > 0) {
            res.status(200).json({ success: true, applications });
        } else {
            res.json({ message: 'No Data' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error..!' });
    }
}

export const updateLeaveStatus = async (req, res) => {
    const { status, docID, applicationID, empID } = req.body;
    try {
        if (status === 'Approved') {
            const leaveApplicationData = await LeaveApplication.aggregate([
                { $match: { userID: mongoose.Types.ObjectId(empID) } },
                { $unwind: '$leaveApplications' },
                { $match: { 'leaveApplications._id': mongoose.Types.ObjectId(applicationID) } }
            ])

            const fromDate = leaveApplicationData[0].leaveApplications?.fromDate
            const toDate = leaveApplicationData[0].leaveApplications?.toDate

            // Loop over each date within the date range
            for (let date = fromDate; date <= toDate; date.setDate(date.getDate() + 1)) {
                const leaveDate = date.toISOString().slice(0, 10);
                const month = moment(date).format("MM"); //date.getUTCMonth()+1;
                const year = moment(date).format('YYYY');
                const monthYear = month + '-' + year;


                const obj = {
                    employeeID: empID,
                    attendanceDetails: [{
                        date: leaveDate,
                        signIn: '00:00:00 AM',
                        signOut: '00:00:00 AM',
                        totalTime: '00:00:00',
                        status: 'Leave'
                    }]
                }
                // Check the month Exist or not
                const monthExist = await AttendanceModel.findOne({ month: monthYear });
                if (!monthExist) {
                    const newPunchIn = new AttendanceModel({
                        month: monthYear,
                        attendance: obj

                    })
                    newPunchIn.save()
                } else {
                    // Check the data inside the data with employeeID
                    const employeeExist = await AttendanceModel.findOne({ $and: [{ month: monthYear }, { 'attendance.employeeID': mongoose.Types.ObjectId(empID) }] })
                    if (!employeeExist) {
                        await AttendanceModel.findOneAndUpdate({ month: monthYear }, {
                            $push: {
                                attendance: obj
                            }
                        })
                    } else {
                        const dataExist = await AttendanceModel.findOne({
                            $and: [
                                { month: monthYear },
                                { 'attendance.employeeID': empID },
                                { 'attendance.attendanceDetails.date': leaveDate }
                            ]
                        })
                        if (dataExist === null) {
                            await AttendanceModel.findOneAndUpdate({
                                $and: [
                                    { month: monthYear },
                                    { 'attendance.employeeID': mongoose.Types.ObjectId(empID) },
                                ]
                            }, {
                                $push: {
                                    'attendance.$.attendanceDetails': obj.attendanceDetails
                                }
                            })
                        } else {
                            const updateQuery = {
                                $set: {
                                    "attendance.$[elem].attendanceDetails.$[detail].signIn": "00:00:00 AM",
                                    "attendance.$[elem].attendanceDetails.$[detail].signOut": "00:00:00 AM",
                                    "attendance.$[elem].attendanceDetails.$[detail].totalTime": "00:00:00",
                                    "attendance.$[elem].attendanceDetails.$[detail].status": "Leave"
                                }
                            };

                            // Define the positional filters for the array elements to update
                            const filters = [
                                { "elem.employeeID": mongoose.Types.ObjectId(empID) },
                                { "detail.date": leaveDate }
                            ];

                            // Define the options for the update operation
                            const options = {
                                arrayFilters: filters
                            };

                            // Execute the update operation
                            await AttendanceModel.updateOne(
                                { month: monthYear },
                                updateQuery,
                                options
                            ).then((response) => {
                            })
                        }
                    }
                }
            }



        }
        await LeaveApplication.findOneAndUpdate({ _id: docID, 'leaveApplications._id': applicationID }, {
            $set: {
                'leaveApplications.$.status': status
            }
        }).then(() => {
            res.status(200).json({ success: true, message: 'Successfully Changed the Status..' })
        })
    } catch (error) {
        res.send({ message: 'Internal Server Error..!' })
    }
}

export const getPendingLeavesCount = async (req, res) => {
    try {
        const count = await LeaveApplication.aggregate([
            { $unwind: '$leaveApplications' },
            { $match: { 'leaveApplications.status': 'Pending' } },
            { $count: 'totalcount' }
        ])
        return res.status(200).json({ success: true, count: count[0]?.totalcount })
    } catch (error) {
        res.send({ message: 'Internal Server Error..!' })
    }
}