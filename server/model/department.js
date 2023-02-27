import { Schema, model } from 'mongoose';

const departmentSchema = Schema({
    department: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
});

const department = model('Department', departmentSchema);
export default department;