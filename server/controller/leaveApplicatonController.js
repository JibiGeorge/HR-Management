import LeaveApplication from "../model/leaveApplicationModel.js";

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
        const applications = await LeaveApplication.findOne({userID}).populate('leaveApplications.leaveType');
        if(applications?.leaveApplications.length >0){
            res.status(200).json({success:true, applications});
        }else{
            res.json({message: 'No Data Founded..'});
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error..!' });
    }
}