import AddressModel from "../model/addressModel.js"
import Employee from "../model/employee.js";

export const getEmployeeAddress = async (req,res)=>{
    try {
        const allAddress = await AddressModel.findOne({employeeName:req.params.id})
        res.status(200).json({success: true, allAddress});
    } catch (error) {
        res.json({message: "Internal Server Error..!"})
    }
}
export const addEmployeeAddress = async (req,res)=>{
    const empId = req.params.id;
    const {permanentAddress, temproryAddress } = req.body
    try {
        const user = await Employee.findOne({_id: empId})
        if(!user){
            res.json({message: "User Not Found For Update Address"})
        }else{
            const isAddress = await AddressModel.findOne({employeeName:empId})
            if(!isAddress){
                const employeeAddress = new AddressModel({
                    employeeName : empId,
                    permanentAddress: permanentAddress,
                    temproryAddress: temproryAddress
                })
                employeeAddress.save().then((response)=>{
                    res.status(200).json({success: true, message: "SuccessFully Updated..!!"})
                })
            }else{
                await AddressModel.findOneAndUpdate({employeeName:empId},{
                    permanentAddress : permanentAddress,
                    temproryAddress : temproryAddress
                })
                res.status(200).json({success: true, message: "SuccessFully Updated..!!"})
            }
        }
    } catch (error) {
        res.json({message: "Internal Server Error..!"})
    }
}