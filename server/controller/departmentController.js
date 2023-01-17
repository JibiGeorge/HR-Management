import departmentModel from "../model/department.js";

export const addDepartment = async (req, res)=>{
    let {department} = req.body;
    try {
        const exist = await departmentModel.findOne({department:department});
        if(exist){
            console.log("Already Exist");
        }else{
            console.log("Not Exist");
            const dept = new departmentModel({
                department
            })
            dept.save().then((response)=>{
                res.status(200).json(response);
            })
        }
    } catch (error) {
        console.log(error.message); 
    }
}

export const getDepartments = async (req, res)=>{
    try {
        const deptList = await departmentModel.find();
        console.log(deptList);
    } catch (error) {
        console.log(error.message);        
    }
}