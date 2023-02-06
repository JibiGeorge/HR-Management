import LeaveType from "../model/leaveType.js"

export const addLeaveType = async (req, res) => {
    const { leaveType } = req.body;
    try {
        const exist = await LeaveType.findOne({ leaveType })
        if (exist) {
            res.json({ message: 'Already Exist' })
        } else {
            const add = new LeaveType({
                leaveType
            })
            add.save().then(() => {
                res.status(200).json({ success: true, message: 'Successfully Addedd..!' })
            })
        }
    } catch (error) {
        res.status(400).json({ message: 'Internal Server Error' })
    }
}

export const getAllLeaveTypes = async (req, res) => {
    try {
        const allLeaveTypes = await LeaveType.find()
        res.status(200).json({ allLeaveTypes, success: true })
    } catch (error) {
        res.status(400).json({ message: 'Internal Server Error' })
    }
}

export const deleteLeaveType = async (req, res) => {
    try {
        await LeaveType.findByIdAndDelete({_id:req.params.id}).then(()=>{
            res.status(200).json({success: true, message: 'Deleted Successfully..!'})
        })
    } catch (error) {
        res.status(400).json({ message: 'Internal Server Error' })
    }
}

export const getLeaveTypeData = async (req,res)=>{
    try {
        const data = await LeaveType.findById({_id:req.params.id})
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ message: 'Internal Server Error' })
    }
}

export const updateLeaveType = async (req,res)=>{
    const {_id, leaveType} = req.body
    try {
        await LeaveType.findByIdAndUpdate(
            {_id},
            {
                leaveType
            }).then((response)=>{
                res.status(200).json({success: true, message: 'SuccessFully Updated..!'})
            })
    } catch (error) {
        res.status(400).json({ message: 'Internal Server Error' })
    }
}