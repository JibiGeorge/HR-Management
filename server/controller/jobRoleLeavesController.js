import jobRoleLeavesModel from "../model/JobRoleLeavesModel.js";

export const addJobRoleLeaves = async (req,res)=>{
    const {designation, leaveType, days} = req.body;
    console.log(req.body);
    try {
        const exist = await jobRoleLeavesModel.findOne({$and: [
            {designation},{leaveType}
        ]})
        if(!exist){
            console.log('new');
            const newJobRoleLeaves = new jobRoleLeavesModel({
                designation, leaveType, days
            })
            newJobRoleLeaves.save().then((response)=>{
                res.status(200).json({success: true, message: 'Created Succesfully'})
            })
        }else{
            res.json({message: 'Already Exist..!'})
        }
    } catch (error) {
        res.json({message: 'Internal Server Error..!'})
    }
}

export const getAllJobRoleLeaves = async (req,res)=>{
    try {
        const data = await jobRoleLeavesModel.find().populate('designation').populate('leaveType')
        res.status(200).json({success: true, data})
    } catch (error) {
        res.json({message: 'Internal Server Error..!'})
    }
}