import { Schema, model } from 'mongoose';

const departmentSchema = Schema({
    department: {
        type: String,
        // required: [true, 'Please provide unique Department Name'],
        unique: [true, 'Department Exist']
    }
});

const department = model('Department', departmentSchema);
export default department;