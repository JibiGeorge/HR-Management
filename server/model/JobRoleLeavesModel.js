import mongoose, { model, Schema } from "mongoose";

const jobRoleLeavesSchema = Schema({
    designation :{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Designation',
        require : true
    },
    leaveType: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'leaveType',
        require: true
    },
    days: {
        type: Number,
        require: true
    }
})

const jobRoleLeavesModel = model('jobroleleaves', jobRoleLeavesSchema);
export default jobRoleLeavesModel;