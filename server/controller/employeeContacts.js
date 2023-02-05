import EmergencyContactModel from "../model/emergencyContactModel.js";

export const addEmergencyContacts = async (req, res) => {
    const empID = req.params.id;
    const { primaryName,
        primaryRelation,
        primaryContactNumber,
        secondaryName,
        secondaryRelation,
        secondaryContactNumber } = req.body;
    try {
        const exist = await EmergencyContactModel.findOne({ employee: empID });
        if (exist) {
            await EmergencyContactModel.findOneAndUpdate({ employee: empID }, {
                primaryName: primaryName,
                primaryRelation: primaryRelation,
                primaryContactNumber: primaryContactNumber,
                secondaryName: secondaryName,
                secondaryRelation: secondaryRelation,
                secondaryContactNumber: secondaryContactNumber
            }).then((resolve)=>{
                res.status(200).json({ success: true, message: 'SuccessFully Updated' })
            })
        } else {
            const add = new EmergencyContactModel({
                employee: empID,
                primaryName,
                primaryRelation,
                primaryContactNumber,
                secondaryName,
                secondaryRelation,
                secondaryContactNumber
            })
            add.save().then(() => {
                res.status(200).json({ success: true, message: 'SuccessFully Added' })
            })
        }
    } catch (error) {
        res.json({ message: 'Internal Server Issue..!' })
    }
}

export const getEmergencyContacts = async (req, res)=>{
    const empID = req.params.id;
    try {
        const contacts = await EmergencyContactModel.findOne({employee:empID});
        res.status(200).json({success: true, contacts})
    } catch (error) {
        res.json({ message: 'Internal Server Issue..!' });        
    }
}