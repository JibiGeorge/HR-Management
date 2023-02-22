import mongoose, { model, Schema } from "mongoose";

const SalarySchema = Schema({
    userID: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'employees',
        require: true
    },
    salaryDetails: {
        type: [{
            salaryType: String,
            totalSalary: Number,
            basicSalary: Number,
            houseRent: Number,
            medical: Number,
            conveyance: Number,
            fromDate: Date,
            toDate: Date
        }]
    }
})

const SalaryModel = model('salaryDetails', SalarySchema);
export default SalaryModel