import mongoose, { Schema, model } from "mongoose";

const employeeSchema = Schema({
    firstName: {
        type: String,
        required: true,
        trim : true
    },
    lastName: {
        type: String,
        required: [true],
        trim : true
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
    },
    panNumber: {
        type: String,
        trim : true
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
    },
    username: {
        type: String,
        required: [true],
        unique: true
    },
    email: {
        type: String,
        required: [true],
        trim : true
    },
    image: {
        type: String
    },
    place: {
        type: String,
        trim : true
    },
    nationality:{
        type: String,
        trim : true
    },
    religion: {
        type: String,
        trim : true
    },
    maritialStatus: String,
    passportNumber: {
        type: String,
        trim : true
    },
    loginPermisionEnabled: {
        type: Boolean,
        require: true
    },
    taxType: String,
    status: String

});

const Employee = model('Employee', employeeSchema);
export default Employee;