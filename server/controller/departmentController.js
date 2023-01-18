import departmentModel from "../model/department.js";

export const addDepartment = async (req, res)=>{
    let {department} = req.body;
    try {
        const exist = await departmentModel.findOne({department:department});
        if(exist){
            res.json({success:false,message:"Already Exist"})
            console.log("Already Exist");
        }else{
            console.log("Not Exist");
            const dept = new departmentModel({
                department
            })
            dept.save().then((response)=>{
                res.status(200).json({response, success:true});
            })
        }
    } catch (error) {
        console.log(error.message); 
    }
}

export const getDepartments = async (req, res)=>{
    try {
        const deptList = await departmentModel.find();
        res.status(200).json(deptList);
    } catch (error) {
        console.log(error.message);        
    }
}

export const deleteDeparatment = async (req,res)=>{
    let departmentId = req.query.id;
    try {
        await departmentModel.findByIdAndDelete({_id:departmentId}).then(()=>{
            res.status(200).json({deleted:true})
        })        
    } catch (error) {
        console.log(error.message);        
    }
}

export const updateDepartment = async(req,res)=>{
    console.log(req.query);
    let {id,text} = req.query;
    try {
        await departmentModel.findOneAndUpdate({_id:id},{department:text}).then((response)=>{
            res.status(200).json({updated:true,message:"Successfully Updated"})
        })        
    } catch (error) {
        res.json({message:error.message,updated:false})       
    }
}