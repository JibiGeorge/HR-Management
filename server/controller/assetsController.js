import Assets from "../model/assets.js"
import AssetsCategory from "../model/assetsCategory.js"

// Assets Category Control
export const addAssetsCategory = async (req, res) => {
    let { categoryName } = req.body
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
        console.log(allAssetsCategories);
        return res.status(200).json({ success: true, allAssetsCategories });
    } catch (error) {
        console.log(error.message);
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
        const categoryName = req.body.categoryName
        await AssetsCategory.findByIdAndUpdate({ _id: id }, { categoryName }).then(() => {
            res.json({ updated: true, message: 'SuccessFully Updated...!' })
        })
    } catch (error) {
        res.json({ message: 'Internal Server Error' })
    }
}




// Assets Control
export const addAssets = async (req, res) => {
    const { assetName } = req.body;
    try {
        const exist = await Assets.findOne({ assetName });
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
        const assets = await Assets.find().populate('assetCategory')
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
    try {
        const { _id, assetName, assetCategory, brand, modelNo, code, inStock, configuration } = req.body;
        const response = await Assets.findByIdAndUpdate(
            { _id }, {
            assetName,
            assetCategory,
            brand,
            modelNo,
            code,
            inStock,
            configuration
        })
        res.status(200).json({updated:true, message: 'Succesfully Updated'})
    } catch (error) {
        res.json({ message: 'Intenal Server Error...!' });
    }
}