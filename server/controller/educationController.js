import EducationModel from "../model/educationModel.js";

export const addEducation = async (req, res)=>{
    const empID = req.params.id;
    const obj = {
        collegeName:  req.body.collegeName,
        courseName : req.body.courseName,
        startFrom : req.body.startFrom,
        endto : req.body.endto
    }
    try {
        const exist = await EducationModel.findOne({employee:empID})
        if(!exist){
            const newData = new EducationModel({
                employee: empID,
                education: obj
            })
            newData.save()            
            res.status(200).json({success: true, message: 'Successfully Created..!'})
        }else{
            const dataExist = await EducationModel.findOne({$and:[
                {'education.collegeName': obj.collegeName},
                {'education.courseName':obj.courseName}
            ]})
            if(!dataExist){
                await EducationModel.findOneAndUpdate({employee:empID},{
                $addToSet:{
                    education:obj
                }}).then((response)=>{
                    res.status(200).json({success: true, message: 'Successfully Created..!'})
                })
            }else{
                res.json({exist: true, message: 'Already Exist'});
            }
        }
    } catch (error) {
        res.json({message: 'Internal Server Error..!'})
    }
}

export const getEducation = async (req,res)=>{
    try {
        const getEducationData = await EducationModel.findOne({employee:req.params.id});
        res.status(200).json({success: true, getEducationData})
    } catch (error) {
        res.json({message: 'Internal Server Error..!'})
    }
}