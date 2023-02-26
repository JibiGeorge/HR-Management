import mongoose, { model, Schema } from "mongoose";

const payrolSchema = Schema({
    month: {
        type: String
    },
    payrolData: {
        type: [{
            employeeName: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'Employee',
                require: true
            },
            salary: {
                type: Number
            },
            basicSalary: {
                type: Number
            },
            houseRent: {
                type: Number
            },
            medical: {
                type: Number
            },
            conveyance: {
                type: Number
            },
            totalLeaves: {
                type: Number
            },
            leaveDeduction: {
                type: Number
            },
            grossSalary: {
                type: Number
            },
            employeePF: {
                type: Number
            },
            employeerPF: {
                type: Number
            },
            employeeESI: {
                type: Number
            },
            employeerESI: {
                type: Number
            },
            TDSAmount: {
                type: Number
            },
            netPayable: {
                type: Number
            },
            paidOn: {
                type: Date
            },
            status: {
                type: String,
                require: true
            },
            paymentMethod: {
                type: String
            },
            bankAccount: {
                type: [{
                    accountNumber: Number,
                    holderName: String,
                    bankName: String,
                    branchName: String,
                    ifscCode: String
                }
                ]
            }
        }]
    }

})

const PayrolModel = model('payrol', payrolSchema);
export default PayrolModel;