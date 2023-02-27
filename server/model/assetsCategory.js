import { model, Schema } from "mongoose";

const assetsCategorySchema = Schema({
    categoryName: {
        type: String,
        unique: true,
        require: true,
        trim:true
    }
})

const AssetsCategory = model('assetscategory', assetsCategorySchema);
export default AssetsCategory;