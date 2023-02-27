import mongoose from "mongoose";
import Assets from "../model/assets.js"
import AssetsCategory from "../model/assetsCategory.js"

const convertCamelCase = (values) => {
    return values.split(/\s+/).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}

// Assets Category Control
export const addAssetsCategory = async (req, res) => {
    let { categoryName } = req.body;
    categoryName = convertCamelCase(categoryName);

    try {
        const exist = await AssetsCategory.findOne({ categoryName })
        if (exist) {
            return res.json({ exist: true, message: 'Category Exist...!' })
        } else {
            const category = new AssetsCategory({ categoryName })
            category.save().then((response) => {
                return res.status(200).json({ success: true, response, message: "Successfully Added...!" })
            })
        }
    } catch (error) {
        return res.json({ success: false, message: 'Internal Server Error...!' })
    }
}

export const getAllAssetsCategories = async (req, res) => {
    try {
        const allAssetsCategories = await AssetsCategory.find();
        return res.status(200).json({ success: true, allAssetsCategories });
    } catch (error) {
        return res.json({ message: 'Internal Server Error...!' });
    }
}

export const deleteAssetsCategory = async (req, res) => {
    try {
        const { id } = req.query
        await AssetsCategory.findByIdAndDelete({ _id: id }).then(() => {
            res.status(200).json({ delete: true, message: 'Deleted Successfully...!' })
        })
    } catch (error) {
        res.json({ delete: false, messsage: 'Intenal Server Error...!' })
    }
}
export const getAssetCategoryData = async (req, res) => {
    try {
        const { id } = req.params
        await AssetsCategory.findById({ _id: id }).then((response) => {
            res.status(200).json({ success: true, response })
        })
    } catch (error) {
        res.json({ message: 'Internal Server Error' })
    }
}
export const updateCategory = async (req, res) => {
    try {
        const id = req.body._id
        const categoryName = convertCamelCase(req.body.categoryName);
        await AssetsCategory.findByIdAndUpdate({ _id: id }, { categoryName }).then(() => {
            res.json({ updated: true, message: 'SuccessFully Updated...!' })
        })
    } catch (error) {
        res.json({ message: 'Internal Server Error' })
    }
}



// Assets Control
export const addAssets = async (req, res) => {
    let data = req.body;
    for (const key in data) {
        if (key !== 'assetCategory' && key !== 'inStock' && key !== 'purchasedOn') {
            data[key] = convertCamelCase(data[key])
        }
    }
    try {
        const exist = await Assets.findOne({ assetName: data.assetName });
        if (exist) {
            return res.json({ exist: true, message: 'Assets Exist...!' })
        } else {
            const assets = new Assets(req.body)
            assets.save().then((response) => {
                return res.status(200).json({ success: true, response, message: "Successfully Added...!" })
            })
        }
    } catch (error) {
        res.json({ message: 'Intenal Server Error...!' })
    }
}

export const getAssets = async (req, res) => {
    try {
        const assets = await Assets.find().populate('assetCategory').sort({ purchasedOn: -1 })
        return res.status(200).json({ success: true, assets });
    } catch (error) {
        res.json({ message: 'Intenal Server Error...!' })
    }
}

export const deleteAssets = async (req, res) => {
    try {
        await Assets.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json({ success: true, message: "Deleted Successfully..!" })
    } catch (error) {
        res.json({ message: 'Intenal Server Error...!' })
    }
}

export const getAssetData = async (req, res) => {
    try {
        const data = await Assets.findOne({ _id: req.params.id })
        res.status(200).json({ success: true, data })
    } catch (error) {
        res.json({ message: 'Intenal Server Error...!' });
    }
}

export const updateAsset = async (req, res) => {
    for (const key in req.body) {
        if (key !== '_id' && key !== 'assetCategory' && key !== 'inStock' && key !== 'purchasedOn' && key !== '__v') {
            req.body[key] = convertCamelCase(req.body[key])
        }
    }
    const { _id, assetName, assetCategory, brand, modelNo, code, inStock, purchasedOn, configuration } = req.body;
    try {
        const response = await Assets.findByIdAndUpdate(
            { _id }, {
            assetName,
            assetCategory,
            brand,
            modelNo,
            code,
            inStock,
            purchasedOn,
            configuration
        })
        res.status(200).json({ updated: true, message: 'Succesfully Updated' })
    } catch (error) {
        res.json({ message: 'Intenal Server Error...!' });
    }
}