import { model, Schema } from "mongoose";

const LeaveTypeSchema = Schema({
    leaveType: {
        type: String,
        require: true,
        unique: true
    },
    days:{
        type: Number,
        require: true
    }
})

const LeaveType = model('leaveType', LeaveTypeSchema);
export default LeaveType;