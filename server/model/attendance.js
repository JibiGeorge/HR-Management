import mongoose, { model, Schema } from "mongoose";

const AttendanceSchema = Schema({
    // employee: {
    //     type: mongoose.SchemaTypes.ObjectId,
    //     ref: 'Employee',
    //     require: true
    // },
    // date:{
    //     type: Date,
    //     require: true
    // },
    // signIn:{
    //     type: String,
    //     require: true
    // },
    // signOut:{
    //     type: String,
    //     require: true
    // },
    // totalTime: {
    //     type: String,
    //     require: true
    // }

    date: {
        type: String,
        require: true
    },
    attendance: {
        type: [{
            employee: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'Employee',
                require: true
            },
            date: {
                type: String,
                require: true
            },
            signIn: {
                type: String,
                require: true
            },
            signOut: {
                type: String,
                require: true
            },
            totalTime: {
                type: String,
                require: true
            }
        }]
    }
})

const AttendanceModel = model('attendance', AttendanceSchema)
export default AttendanceModel;