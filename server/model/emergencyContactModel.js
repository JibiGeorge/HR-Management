import mongoose, { model, Schema } from "mongoose";

const EmergencyContactSchema = Schema({
    employee: {
        type: mongoose.SchemaTypes.ObjectId,
        require: true,
        ref: 'Employee'
    },
    primaryName: {
        type: String
    },
    primaryRelation: {
        type: String
    },
    primaryContactNumber: {
        type: Number
    },
    secondaryName: {
        type: String
    },
    secondaryRelation: {
        type: String
    },
    secondaryContactNumber: {
        type: Number
    }
})

const EmergencyContactModel = model('emergencyContacts',EmergencyContactSchema);
export default EmergencyContactModel