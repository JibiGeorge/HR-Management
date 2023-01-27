import AssetsCategory from "../model/assetsCategory.js"

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