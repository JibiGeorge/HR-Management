import instance from "../utils/serverConfig";

export const addAssetsCategory = async (values)=>{
    try {
        const addCategory = await instance({
            url: '/api/assetsCategory/add',
            method: 'POST',
            data: values
        })
        return addCategory.data;
    } catch (error) {
        return message = "Internal Server Error...!"
    }
}

export const getAssetsCategory = async ()=>{
    try {
        const categories = await instance({
            url: '/api/assetsCategory/get',
            method: 'GET'
        })
        return categories.data
    } catch (error) {
        return message = "Internal Server Error...!"
    }
}

export const deleteAssetsCategory = async (id)=>{
    try {
        const deleteCategory = await instance({
            url: '/api/assetsCategory/delete?id='+id,
            method: 'DELETE'
        })
        return deleteCategory.data
    } catch (error) {
        return message = "Internal Server Error...!"
    }
}

export const addAssets = async (values)=>{
    try {
        const addAssets = await instance({
            url: '/api/assets/add',
            method: 'POST',
            data: values
        })
        return addAssets.data;
    } catch (error) {
        return message = "Internal Server Error...!"
    }
}

export const getAssets = async ()=>{
    try {
        const assets = await instance({
            url: '/api/assets/get',
            method: 'GET'
        })
        return assets.data
    } catch (error) {
        console.log(error.message);
        return message = "Internal Server Error...!"
    }
}