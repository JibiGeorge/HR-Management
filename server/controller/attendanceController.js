import mongoose from "mongoose";
import AttendanceModel from "../model/attendance.js"

export const addAttendance = async (req, res) => {
    const { employee, date, signIn, signOut } = req.body;

    //AM and PM Setting up in SignIN
    var timeStart = signIn.split(':'), hours, minutes, meridian;
    hours = timeStart[0];
    minutes = timeStart[1];
    if (hours > 12) {
        meridian = 'PM';
        hours -= 12;
    } else if (hours < 12) {
        meridian = 'AM';
        if (hours == 0) {
            hours = 12;
        }
    } else {
        meridian = 'PM';
    }
    const signInTime = signIn + ' ' + meridian;

    //AM and PM Setting up in SignIN
    var timeStart = signOut.split(':'), hours, minutes, meridian;
    hours = timeStart[0];
    minutes = timeStart[1];
    if (hours > 12) {
        meridian = 'PM';
        hours -= 12;
    } else if (hours < 12) {
        meridian = 'AM';
        if (hours == 0) {
            hours = 12;
        }
    } else {
        meridian = 'PM';
    }
    const signOutTime = signOut + ' ' + meridian;

    try {
        let timeStart = signIn.split(':');
        let timeEnd = signOut.split(':');
        var diff = (timeEnd[0] - timeStart[0]) * 3600 + (timeEnd[1] - timeStart[1]) * 60;
        var diffsec = (timeEnd[1] - timeStart[1]) * 3600 + (timeEnd[1] - timeStart[1]) * 60;
        var hours = Math.floor(diff / 3600);
        var seconds = Math.floor(diffsec / 3600);
        let totalTime = hours + ':' + seconds;

        const obj = {
            employee: employee,
            date: date,
            signIn: signInTime,
            signOut: signOutTime,
            totalTime: totalTime
        }
        if (hours < 0 || seconds < 0) {
            totalTime = 0;
            res.json({ message: "Time is Not Correct..!" });
        } else {
            const dateExist = await AttendanceModel.findOne({ date: date })
            if (dateExist) {
                const attendanceExist = await AttendanceModel.findOne({ $and: [{ date: date }, { attendance: { $elemMatch: { employee: employee } } }] });
                if (!attendanceExist) {
                    await AttendanceModel.findOneAndUpdate(
                        { date: date },
                        {
                            $push: {
                                attendance: obj
                            }
                        }
                    ).then((response) => {
                        res.status(200).json({ success: true, message: 'Successfully Added..!' })
                    }).catch((error) => {
                        res.json({ message: 'Failed..!' });
                    })
                } else {
                    res.json({ message: 'Already Exist..!' });
                }
            } else {
                const attendance = new AttendanceModel({
                    date: date,
                    attendance: obj
                })
                attendance.save().then(() => {
                    res.status(200).json({ success: true, message: 'Successfully Added..!' })
                });
            }
        }
    } catch (error) {
        res.json({ message: 'Internal Server Connection Error..!' })
    }
}

export const getAttendanceList = async (req, res) => {
    try {
        const data = await AttendanceModel.aggregate([
            { $unwind: '$attendance' },
            {
                $lookup: {
                    from: 'employees',
                    localField: 'attendance.employee',
                    foreignField: '_id',
                    as: 'userDetails'
                }
            }
        ])
        res.status(200).json({ data, success: true })
    } catch (error) {
        res.json({ message: 'Internal Server Connection Error..!' })
    }
}

export const deleteAttendance = async (req, res) => {
    try {
        await AttendanceModel.updateMany({}, {
            $pull: {
                attendance: {
                    _id: req.params.id
                }
            }
        })
        res.status(200).json({ success: true, message: 'Deleted Successfully..!' })
    } catch (error) {
        res.json({ message: 'Internal Server Connection Error..!' })
    }
}

export const getAttendanceData = async (req, res) => {
    var objectId = mongoose.Types.ObjectId(req.params.id);
    try {
        // const data = await AttendanceModel.findById({ _id: req.params.id })
        const data = await AttendanceModel.aggregate([
            { $unwind: '$attendance' },
            {
                $match: {
                    'attendance._id': objectId
                }
            }
        ])
        res.status(200).json({ success: true, data })
    } catch (error) {
        res.json({ message: 'Internal Server Connection Error..!' })
    }
}

export const updateAttendance = async (req, res) => {
    const { _id, employee, date, signIn, signOut } = req.body;
    try {
        //AM and PM Setting up in SignIN
        var timeStart = signIn.split(':'), hours, minutes, meridian;
        hours = timeStart[0];
        minutes = timeStart[1];
        if (hours > 12) {
            meridian = 'PM';
            hours -= 12;
        } else if (hours < 12) {
            meridian = 'AM';
            if (hours == 0) {
                hours = 12;
            }
        } else {
            meridian = 'PM';
        }
        const signInTime = signIn + ' ' + meridian;

        //AM and PM Setting up in SignIN
        var timeStart = signOut.split(':'), hours, minutes, meridian;
        hours = timeStart[0];
        minutes = timeStart[1];
        if (hours > 12) {
            meridian = 'PM';
            hours -= 12;
        } else if (hours < 12) {
            meridian = 'AM';
            if (hours == 0) {
                hours = 12;
            }
        } else {
            meridian = 'PM';
        }
        const signOutTime = signOut + ' ' + meridian;

        try {
            let timeStart = signIn.split(':');
            let timeEnd = signOut.split(':');
            var diff = (timeEnd[0] - timeStart[0]) * 3600 + (timeEnd[1] - timeStart[1]) * 60;
            var diffsec = (timeEnd[1] - timeStart[1]) * 3600 + (timeEnd[1] - timeStart[1]) * 60;
            var hours = Math.floor(diff / 3600);
            var seconds = Math.floor(diffsec / 3600);
            let totalTime = hours + ':' + seconds;
            if (hours < 0 || seconds < 0) {
                totalTime = 0;
                res.json({ message: "Time is Not Correct..!" });
            } else {
                const dateChecking = await AttendanceModel.findOne({
                    $and:
                            [{ date: date }, {
                                attendance: {
                                    $elemMatch: {
                                        _id: _id
                                    }
                                }
                            }]
                })
                if (dateChecking) {
                    await AttendanceModel.findOneAndUpdate({
                        $and:
                            [{ date: date }, {
                                attendance: {
                                    $elemMatch: {
                                        _id: _id
                                    }
                                }
                            }]
                    }, {
                        $set: {
                            'attendance.$.signIn': signInTime,
                            'attendance.$.signOut': signOutTime,
                            'attendance.$.totalTime': totalTime
                        }
                    }).then((response) => {
                        res.status(200).json({ success: true, message: 'Successfully Updated..' })
                    }).catch((error) => {
                        res.json({ message: 'Updating Failed' })
                    })
                } else {
                    const obj = {
                        employee: employee,
                        date: date,
                        signIn: signInTime,
                        signOut: signOutTime,
                        totalTime: totalTime
                    }
                    const dateExist = await AttendanceModel.findOne({ date: date })
                    if (dateExist) {
                        const attendanceExist = await AttendanceModel.findOne({ $and: [{ date: date }, { attendance: { $elemMatch: { employee: employee } } }] });
                        if (!attendanceExist) {
                            await AttendanceModel.findOneAndUpdate(
                                { date: date },
                                {
                                    $push: {
                                        attendance: obj
                                    }
                                }
                            ).then(async(response) => {
                                await AttendanceModel.updateMany({}, {
                                    $pull: {
                                        attendance: {
                                            _id:_id
                                        }
                                    }
                                })
                                res.status(200).json({ success: true, message: 'Successfully Updated..!' })
                            }).catch((error) => {
                                res.json({ message: 'Failed..!' });
                            })
                        }else{
                            res.json({ message: 'Already Exist..!' });
                        }
                    } else {
                        const attendance = new AttendanceModel({
                            date: date,
                            attendance: obj
                        })
                        attendance.save().then(() => {
                            res.status(200).json({ success: true, message: 'Successfully Updated..!' })
                        });
                    }
                }
            }
        } catch (error) {
            res.json({ message: 'Internal Server Connection Error..!' })
        }
    } catch (error) {
        res.json({ message: 'Internal Server Connection Error..!' })
    }
}

export const punchIn = async (req, res) => {
    try {
        const userDetails = res.locals;
        const currentDate = new Date().toISOString().slice(0,10)
        const currentTime = new Date().toLocaleTimeString();
        const obj = {
            employee: userDetails.userID,
            date: currentDate,
            signIn: currentTime,
            signOut: null,
            totalTime: 0
        }
        const dateExist = await AttendanceModel.findOne({ date: currentDate });
        if (!dateExist) {
            const newSignIn = new AttendanceModel({
                date: currentDate,
                attendance: obj
            })
            newSignIn.save().then(() => {
                res.status(200).json({ success: true, message: 'Punched In Successfully' })
            }).catch((error) => {
                res.json({ message: error.message })
            })
        } else {
            const data = await AttendanceModel.findOne({
                $and: [
                    { date: currentDate }, { attendance: { $elemMatch: { employee: userDetails.userID } } }
                ]
            })
            if (!data) {
                await AttendanceModel.findOneAndUpdate({ date: currentDate }, {
                    $push: {
                        attendance: obj
                    }
                }).then(() => {
                    res.status(200).json({ success: true, message: 'Punched In Successfully' })
                }).catch((error) => {
                    res.json({ message: error.message })
                })
            } else {
                res.json({ message: 'Already Punched In' })
            }
        }
    } catch (error) {
        res.json({ message: 'Internal Server Connection Error..!' });
    }
}

export const punchOut = async (req, res) => {
    const userDetails = res?.locals;
    const currentDate = new Date().toISOString().slice(0,10)
    const currentTime = new Date().toLocaleTimeString();
    try {
        const data = await AttendanceModel.aggregate([
            {
                $match: {
                    date: currentDate
                }
            },
            {
                $unwind: '$attendance'
            },
            {
                $match: {
                    $and: [
                        { date: currentDate }, { 'attendance.employee': userDetails.userID }
                    ]
                }
            }
        ])

        if (data) {
            let signIntime = data[0].attendance.signIn;
            signIntime = '2/14/2023, ' + signIntime;
            signIntime = new Date(signIntime)
            signIntime = Math.abs((new Date(signIntime).getTime() / 1000).toFixed(0))

            let presentDate = new Date();
            presentDate = Math.abs((new Date(presentDate).getTime() / 1000).toFixed(0))

            var diff = presentDate - signIntime
            var hours = Math.floor(diff / 3600) % 24
            var minutes = Math.floor(diff / 60) % 60
            var seconds = diff % 60;
            const totalTime = + hours + ':' + minutes + ':' + seconds

            await AttendanceModel.findOneAndUpdate({
                $and: [
                    { date: currentDate },
                    {
                        attendance: {
                            $elemMatch: {
                                employee: userDetails?.userID
                            }
                        }
                    }
                ]
            }, {
                $set: {
                    'attendance.$.signOut': currentTime,
                    'attendance.$.totalTime': totalTime
                }
            }).then((response) => {
                res.status(200).json({ success: true, message: 'Punched Out Successfully' })
            }).catch((error) => {
                res.json({ message: error.message })
            })
        } else {
            res.json({ message: 'Failed..!' })
        }

    } catch (error) {
        res.json({ message: 'Internal Server Connection Error..!' });
    }
}

export const getPunchedData = async (req, res) => {
    const userDetails = res.locals;
    const currentDate = new Date().toISOString().slice(0,10)
    try {
        const data = await AttendanceModel.aggregate([
            {
                $match: {
                    date: currentDate
                }
            },
            {
                $unwind: '$attendance'
            },
            {
                $match: {
                    $and: [
                        { date: currentDate }, { 'attendance.employee': userDetails.userID }
                    ]
                }
            }
        ])
        res.status(200).json({ success: true, data })
    } catch (error) {
        res.json({ message: 'Internal Server Connection Error..!' });
    }
}