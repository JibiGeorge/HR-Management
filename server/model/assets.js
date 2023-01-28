import { model, Schema } from "mongoose";

const assetsSchema = Schema({
    assetName: {
        type: String,
        require: true
    },
    assetCategory: {
        type: String,
        require: true
    },
    brand: {
        type: String,
        require: true
    },
    modelNo: {
        type: String,
        require: true
    },
    modelNo: {
        type: String,
        require: true
    },
    code: {
        type: String,
        require: true
    },
    inStock: {
        type: String,
        require: true
    },
    configuration: {
        type: String,
        require: true
    }
})

const Assets = model('assets', assetsSchema);
export default Assets;