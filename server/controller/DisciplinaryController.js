import DisciplinaryModel from "../model/DisciplinaryModel.js";

export const addDesciplinary = (req, res) => {
    const { employeeId, department, designation, disciplinaryAction, title, details } = req.body;
    try {
        const newData = new DisciplinaryModel({
            employeeId,
            department,
            designation,
            disciplinaryAction,
            title,
            details
        });
        newData.save()
        .then((response)=>{
            res.status(200).json({success: true, message: 'Successfully Added'});
        })
        .catch(error=> res.status(500).json({ message: 'Internal Server Error..!' }));
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error..!' });
    }
}

export const getAllDatas = async (req,res)=>{
    try {
        const data = await DisciplinaryModel.find().populate('employeeId').populate('designation').populate('department')
        res.status(200).json({success: true, data})
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error..!' });
    }
}

export const deletDisciplinary = async (req,res)=>{
    const {id} = req.params;
    try {
        await DisciplinaryModel.findByIdAndDelete({_id:id})
        .then((respone)=>{
            res.status(200).json({success:true, message: 'Deleted Successfully'});
        })
        .catch((error)=>{
            res.status(500).json({ message: 'Internal Server Error..!' });
        })
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error..!' });
    }
}