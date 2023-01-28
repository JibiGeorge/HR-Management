import Assets from "../model/assets.js"
import AssetsCategory from "../model/assetsCategory.js"

// Assets Category Control
export const addAssetsCategory = async (req,res)=>{
    let {categoryName} = req.body
    try {
        const exist = await AssetsCategory.findOne({categoryName})
        if(exist){
            return res.json({exist:true, message: 'Category Exist...!'})
        }else{
            const category = new AssetsCategory({categoryName})
            category.save().then((response)=>{
                return res.status(200).json({ success: true,response, message:"Successfully Added...!"})
            })
        }
    } catch (error) {
        return res.json({success: false, message: 'Internal Server Error...!'})        
    }
}

export const getAllAssetsCategories = async (req,res)=>{
    try {
        const allAssetsCategories = await AssetsCategory.find();
        return res.status(200).json({success: true, allAssetsCategories});
    } catch (error) {
        return res.json({message:'Internal Server Error...!'});
    }
}

export const deleteAssetsCategory = async (req,res)=>{
    try {
        const {id} = req.query
        await AssetsCategory.findByIdAndDelete({_id:id}).then(()=>{
            res.status(200).json({delete:true, message: 'Deleted Successfully...!'})
        })
    } catch (error) {
        res.json({delete:false, messsage: 'Intenal Server Error...!'})
    }
}




// Assets Control
export const addAssets = async (req,res)=>{
    const { assetName } = req.body;
    try {
        const exist = await Assets.findOne({assetName});
        if(exist){
            return res.json({exist:true, message: 'Assets Exist...!'})
        }else{
            const assets = new Assets(req.body)
            assets.save().then((response)=>{
                return res.status(200).json({ success: true,response, message:"Successfully Added...!"})
            })
        }
    } catch (error) {
        res.json({messsage: 'Intenal Server Error...!'})
    }
}

export const getAssets = async (req,res)=>{
    try {
        const assets = await Assets.find();
        return res.status(200).json({success: true, assets});
    } catch (error) {
        res.json({messsage: 'Intenal Server Error...!'})
    }
}