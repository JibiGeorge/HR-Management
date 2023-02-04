import mongoose, { Schema, model } from "mongoose";

const employeeSchema = Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: [true]
    },
    empCode: {
        type: String,
        required: [true]
    },
    department: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Department'
    },
    designation: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Designation'
    },
    role: {
        type: String,
        required: [true]
    },
    gender: {
        type: String,
        required: [true]
    },
    bloodGroup: {
        type: String,
        required: [true]
    },
    panNumber: {
        type: String,
        required: [true]
    },
    contactNumber: {
        type: Number,
        required: [true]
    },
    dateofBirth: {
        type: Date,
        required: [true]
    },
    dateofJoin: {
        type: Date,
        required: [true]
    },
    dateofLeave: {
        type: Date,
        required: [true]
    },
    username: {
        type: String,
        required: [true],
        unique: true
    },
    email: {
        type: String,
        required: [true]
    },
    image: {
        type: String
    },
    place: {
        type: String
    },
    nationality:{
        type: String
    },
    religion: String,
    maritialStatus: String,
    passportNumber: String

});

const Employee = model('Employee', employeeSchema);
export default Employee;