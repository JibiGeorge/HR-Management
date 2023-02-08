import mongoose, { model, Schema } from "mongoose";

const leaveApplicationSchema = Schema({
    userID: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Employee',
        require: true
    },
    leaveApplications: {
        type: [{
            leaveType: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'leaveType',
                require: true
            },
            applyDate: {
                type: Date,
                require: true
            },
            fromDate: {
                type: Date,
                require: true
            },
            toDate:{
                type: Date,
                require: true
            },
            modeOfLeave: {
                type: String,
                require: true
            },
            days:{
                type: Number,
                require: true
            },
            status: {
                type: String,
                require: true
            }
        }]
    }
    
})

const LeaveApplication = model('leaveApplications',leaveApplicationSchema);
export default LeaveApplication;