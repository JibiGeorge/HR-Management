import axios from "axios";

export const addAssetsCategory = async (values)=>{
    try {
        const addCategory = await axios.post('/api/assetsCategory/add',values)
        return addCategory.data;
    } catch (error) {
        return message = "Internal Server Error...!"
    }
}

export const getAssetsCategory = async ()=>{
    try {
        const categories = await axios.get('/api/assetsCategory/get');
        return categories.data
    } catch (error) {
        return message = "Internal Server Error...!"
    }
}

export const deleteAssetsCategory = async (id)=>{
    try {        
        const deleteCategory = await axios.delete('/api/assetsCategory/delete?id='+id)
        return deleteCategory.data
    } catch (error) {
        return message = "Internal Server Error...!"
    }
}

export const addAssets = async (values)=>{
    try {
        const addAssets = await axios.post('/api/assets/add',values);
        return addAssets.data;
    } catch (error) {
        return message = "Internal Server Error...!"
    }
}

export const getAssets = async ()=>{
    try {
        const assets = await axios.get('/api/assets/get')
        return assets.data
    } catch (error) {
        console.log(error.message);
        return message = "Internal Server Error...!"
    }
}