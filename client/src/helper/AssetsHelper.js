import instance from "../utils/serverConfig";

export const addAssetsCategory = async (values, token) => {
    try {
        const addCategory = await instance({
            url: '/api/assetsCategory/add',
            method: 'POST',
            data: values,
            headers: {
                Authorization: token
            }
        })
        return addCategory.data;
    } catch (error) {
        return message = "Internal Server Error...!"
    }
}

export const getAllAssetsCategory = async (token) => {
    try {
        const categories = await instance({
            url: '/api/assetsCategory/get',
            method: 'GET',
            headers: {
                Authorization: token
            }
        })
        return categories.data
    } catch (error) {
        return message = "Internal Server Error...!"
    }
}

export const deleteAssetsCategory = async (id, token) => {
    try {
        const deleteCategory = await instance({
            url: '/api/assetsCategory/delete?id=' + id,
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        })
        return deleteCategory.data
    } catch (error) {
        return message = "Internal Server Error...!"
    }
}

export const getAssetCategoryDetails = async (id, token) => {
    try {
        const getDetails = await instance({
            url: '/api/assetsCategory/getData/' + id,
            method: 'GET',
            headers: {
                Authorization: token
            }
        })
        return getDetails.data
    } catch (error) {
        return { message: 'Server Connection Failed' }
    }
}

export const updateCategoryData = async (newdata, token) => {
    try {
        const status = await instance({
            url: '/api/assetsCategory/update',
            method: 'PUT',
            data: newdata,
            headers: {
                Authorization: token
            }
        })
        return status.data
    } catch (error) {
        return { message: 'Server Connection Failed' }
    }
}

export const addAssets = async (values, token) => {
    try {
        const addAssets = await instance({
            url: '/api/assets/add',
            method: 'POST',
            data: values,
            headers: {
                Authorization: token
            }
        })
        return addAssets.data;
    } catch (error) {
        return message = "Internal Server Error...!"
    }
}

export const getAssets = async (token) => {
    try {
        const assets = await instance({
            url: '/api/assets/get',
            method: 'GET',
            headers: {
                Authorization: token
            }
        })
        return assets.data
    } catch (error) {
        return message = "Internal Server Error...!"
    }
}

export const deleteAssets = async (id, token) => {
    try {
        const deleteAssets = await instance({
            url: '/api/assets/delete/' + id,
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        })
        return deleteAssets.data
    } catch (error) {
        return message = "Internal Server Error...!"
    }
}

export const getAssetData = async (id, token) => {
    try {
        const asset = await instance({
            url: '/api/assets/getData/' + id,
            method: 'GET',
            headers: {
                Authorization: token
            }
        })
        return asset.data
    } catch (error) {
        return message = "Internal Server Error...!"
    }
}

export const updateAsset = async (data, token) => {
    try {
        const asset = await instance({
            url: '/api/assets/update',
            method: 'PUT',
            data: data,
            headers: {
                Authorization: token
            }
        })
        return asset.data
    } catch (error) {
        return message = "Internal Server Error...!"
    }
}