import { model, Schema } from "mongoose";

const companyProfileSchema = Schema({
    companyName : {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    email:{
        type: String
    },
    timeZone: {
        type: String,
        require: true
    },
    logo:{
        type: String,
    }
})

const CompanyProfileModel = model('comapnyprofile', companyProfileSchema);
export default CompanyProfileModel;