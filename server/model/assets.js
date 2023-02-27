import mongoose, { model, Schema } from "mongoose";

const assetsSchema = Schema({
    assetName: {
        type: String,
        require: true,
        trim: true
    },
    assetCategory: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'assetscategory'
    },
    brand: {
        type: String,
        require: true,
        trim: true
    },
    modelNo: {
        type: String,
        require: true,
        trim: true
    },
    code: {
        type: String,
        require: true,
        trim: true
    },
    inStock: {
        type: String,
        require: true
    },
    purchasedOn: {
        type: Date,
        require: true
    },
    configuration: {
        type: String,
        require: true,
        trim: true
    }
})

const Assets = model('assets', assetsSchema);
export default Assets;