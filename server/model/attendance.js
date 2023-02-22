import mongoose, { model, Schema } from "mongoose";

const AttendanceSchema = Schema({
    // date: {
    //     type: String,
    //     require: true
    // },
    // attendance: {
    //     type: [{
    //         employee: {
    //             type: mongoose.SchemaTypes.ObjectId,
    //             ref: 'Employee',
    //             require: true
    //         },
    //         date: {
    //             type: String,
    //             require: true
    //         },
    //         signIn: {
    //             type: String,
    //             require: true
    //         },
    //         signOut: {
    //             type: String,
    //             require: true
    //         },
    //         totalTime: {
    //             type: String,
    //             require: true
    //         }
    //     }]
    // }
    month: {
        type: String,
        require: true
    },
    attendance: {
        type: [{
            employeeID: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'Employee',
            },
            attendanceDetails: {
                type: [{
                    date: {
                        type: String
                    },
                    signIn: {
                        type: String
                    },
                    signOut: {
                        type: String
                    },
                    totalTime: {
                        type: String
                    },
                    status: {
                        type: String
                    }
                }]
            }
        }]
    }
})

const AttendanceModel = model('attendance', AttendanceSchema)
export default AttendanceModel;