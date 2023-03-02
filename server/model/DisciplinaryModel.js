import mongoose, { model, Schema } from "mongoose";

const DisciplinarySchema = Schema({
    employeeId: {
        type: mongoose.SchemaTypes.ObjectId,
        require: true,
        ref: 'Employee'
    },
    department: {
        type: mongoose.SchemaTypes.ObjectId,
        require: true,
        ref: 'Department'
    },
    designation: {
        type: mongoose.SchemaTypes.ObjectId,
        require: true,
        ref: 'Designation'
    },
    disciplinaryAction: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    details: {
        type: String,
        require: true
    }
});

const DisciplinaryModel = model('disciplinary', DisciplinarySchema);
export default DisciplinaryModel;