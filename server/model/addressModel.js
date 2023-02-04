import mongoose, { model, Schema } from "mongoose";

const addressSchema = Schema({
    employeeName: {
        type: mongoose.SchemaTypes.ObjectId,
        require: true,
        ref: 'Employee'
    },
    permanentAddress: {
        type: String
    },
    temproryAddress: {
        type: String
    }
})

const AddressModel = model('address', addressSchema);
export default AddressModel;