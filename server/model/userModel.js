import mongoose, { Schema, model } from 'mongoose';

const userSchema = Schema({
    userID:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Employee'
    },
    username: {
        type: String,
        required: [true, 'Please provide unique Username'],
        unique: [true, 'Username Exist']
    },
    password: {
        type: String,
        required: [true, 'Please provide a Password'],
        unique: false
    },
    role: {
        type: String,
        require: true
    }
});

const userCredential = model('User', userSchema);
export default userCredential;