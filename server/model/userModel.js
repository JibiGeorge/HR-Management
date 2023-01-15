import { Schema, model } from 'mongoose';

const userSchema = Schema({
    username: {
        type: String,
        required: [true, 'Please provide unique Username'],
        unique: [true, 'Username Exist']
    },
    password: {
        type: String,
        required: [true, 'Please provide a Password'],
        unique: false
    }
});

const userCredential = model('User', userSchema);
export default userCredential;