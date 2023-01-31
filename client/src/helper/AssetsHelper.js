import instance from "../utils/serverConfig";

export const addAssetsCategory = async (values) => {
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

export const getAllAssetsCategory = async () => {
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

export const deleteAssetsCategory = async (id) => {
    try {
        const deleteCategory = await instance({
            url: '/api/assetsCategory/delete?id=' + id,
            method: 'DELETE'
        })
        return deleteCategory.data
    } catch (error) {
        return message = "Internal Server Error...!"
    }
}

export const getAssetCategoryDetails = async (id) => {
    try {
        const getDetails = await instance({
            url: '/api/assetsCategory/getData/' + id,
            method: 'GET'
        })
        return getDetails.data
    } catch (error) {
        return { message: 'Server Connection Failed' }
    }
}

export const updateCategoryData = async (newdata) => {
    try {
        const status = await instance({
            url: '/api/assetsCategory/update',
            method: 'PUT',
            data: newdata
        })
        return status.data
    } catch (error) {
        return { message: 'Server Connection Failed' }
    }
}

export const addAssets = async (values) => {
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

export const getAssets = async () => {
    try {
        const assets = await instance({
            url: '/api/assets/get',
            method: 'GET'
        })
        return assets.data
    } catch (error) {
        return message = "Internal Server Error...!"
    }
}

export const deleteAssets = async (id) => {
    try {
        const deleteAssets = await instance({
            url: '/api/assets/delete/' + id,
            method: 'DELETE'
        })
        return deleteAssets.data
    } catch (error) {
        return message = "Internal Server Error...!"
    }
}

export const getAssetData = async (id) => {
    try {
        const asset = await instance({
            url: '/api/assets/getData/' + id,
            method: 'GET'
        })
        return asset.data
    } catch (error) {
        return message = "Internal Server Error...!"
    }
}

export const updateAsset = async (data) => {
    try {
        const asset = await instance({
            url: '/api/assets/update',
            method: 'PUT',
            data: data
        })
        return asset.data
    } catch (error) {
        return message = "Internal Server Error...!"
    }
}