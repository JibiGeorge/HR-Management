import mongoose, { model, Schema } from "mongoose";

const bankAccountSchema = Schema({
    employee: {
        type: mongoose.SchemaTypes.ObjectId,
        require: true
    },
    holderName: {
        type: String,
        require: true
    },
    accountNumber:{
        type: Number,
        require: true
    },
    bankName:{
        type: String,
        require: true
    },
    branchName:{
        type: String,
        require: true
    },
    ifscCode:{
        type: String,
        require: true
    }
})

const EmployeeBankAccount = model('employeebankaccount',bankAccountSchema);
export default EmployeeBankAccount