import AttendanceModel from "../model/attendance.js"

export const addAttendance = async (req, res) => {
    const { employee, date, signIn, signOut } = req.body
    try {
        let timeStart = signIn.split(':')
        let timeEnd = signOut.split(':')
        var diff = (timeEnd[0] - timeStart[0]) * 3600 + (timeEnd[1] - timeStart[1]) * 60;
        var diffsec = (timeEnd[1] - timeStart[1]) * 3600 + (timeEnd[1] - timeStart[1]) * 60;
        var hours = Math.floor(diff / 3600);
        var seconds = Math.floor(diffsec / 3600);
        let totalTime = hours + ':' + seconds;
        if (hours < 0 || seconds < 0) {
            totalTime = 0;
            res.json({ message: "Time is Not Correct..!" })
        } else {
            const exist = await AttendanceModel.findOne({ $and: [{ employee: employee }, { date: date }] })
            if (exist) {
                res.json({ message: 'Already Exist..!' })
            } else {
                const attendance = new AttendanceModel({
                    employee,
                    date,
                    signIn,
                    signOut,
                    totalTime
                })
                attendance.save().then(() => {
                    res.status(200).json({ success: true, message: 'Successfully Added..!' })
                })
            }
        }
    } catch (error) {
        res.json({ message: 'Internal Server Connection Error..!' })
    }
}

export const getAttendanceList = async (req, res) => {
    try {
        const data = await AttendanceModel.find().populate('employee')
        res.status(200).json({ data, success: true })

    } catch (error) {
        res.json({ message: 'Internal Server Connection Error..!' })
    }
}