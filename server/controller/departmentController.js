import departmentModel from "../model/department.js";

export const addDepartment = async (req, res) => {
    let { department } = req.body;
    try {
        const exist = await departmentModel.findOne({ department: department });
        if (exist) {
            res.json({ success: false, message: "Already Exist" })
        } else {
            const dept = new departmentModel({
                department
            })
            dept.save().then((response) => {
                res.status(200).json({ response, success: true });
            })
        }
    } catch (error) {
        res.json({ success: false, message: "Internal Server Error" })
    }
}

export const getDepartments = async (req, res) => {
    try {
        const deptList = await departmentModel.find();
        res.status(200).json(deptList);
    } catch (error) {
        res.status(401).json({ message: "Internal Server Error...!" });
    }
}

export const deleteDeparatment = async (req, res) => {
    let departmentId = req.query.id;
    try {
        await departmentModel.findByIdAndDelete({ _id: departmentId }).then(() => {
            res.status(200).json({ deleted: true })
        })
    } catch (error) {
        res.status(401).json({ message: "Internal Server Error...!" });
    }
}

export const updateDepartment = async (req, res) => {
    let { id, text } = req.query;
    try {
        await departmentModel.findOneAndUpdate({ _id: id }, { department: text }).then((response) => {
            res.status(200).json({ updated: true, message: "Successfully Updated" })
        })
    } catch (error) {
        res.json({ message: error.message, updated: false })
    }
}