import designationModel from "../model/designation.js";

export const addDesignation = async (req, res) => {
    let { designationData } = req.body;
    designationData.designation = designationData?.designation
        .split(/\s+/) // split by one or more whitespace characters
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    try {
        const exist = await designationModel.findOne({ designation: designationData.designation })
        if (exist) {
            res.json({ success: false, message: "Already Exist" });
        } else {
            const design = new designationModel({
                departmentId: designationData.departmentId,
                designation: designationData.designation
            })
            design.save().then(() => {
                res.status(200).json({ message: 'Added Successfully', success: true })
            })
        }
    } catch (error) {
        res.json({ error: 'Internal Server Error' })
    }
}

export const getAllDesignation = async (req, res) => {
    try {
        const data = await designationModel.find().populate('departmentId');
        res.status(200).json({ success: true, data })
    } catch (error) {
        res.json({ error: 'Internal Server Error' })
    }
}

export const deleteDesignation = async (req, res) => {
    try {
        const id = req.query.designationId;
        const response = await designationModel.findByIdAndDelete({ _id: id })
        if (response) {
            res.status(200).json({ success: true, message: "Deleted Successfully....!" })
        } else {
            res.json({ success: false, message: "Not Deleted.....!" })
        }
    } catch (error) {
        res.json({ message: "Internal Server Error" })
    }
}