import mongoose, { Schema, model } from "mongoose";

const designationSchema = Schema({
    departmentId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Department'
    },
    designation: {
        type: String,
        unique: true,
        trim: true
    }
});

const designation = model('Designation', designationSchema);
export default designation;