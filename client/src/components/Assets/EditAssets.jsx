import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { getAllAssetsCategory, getAssetData, getAssets, updateAsset } from '../../helper/AssetsHelper'
import { setAssets } from '../../redux/features/assetsSlice'

const EditAssets = ({ closeModal, id }) => {
    const {userDetails} = useSelector(state => state.user);
    
    const token = userDetails.UserToken;
    const [assetData, setAssetData] = useState('')
    const [assetCategory, setAssetCategory] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        try {
            (async () => {
                const assetData = await getAssetData(id,token);
                if (assetData.success) {
                    const assetCategory = await getAllAssetsCategory(token)
                    setAssetCategory(assetCategory.allAssetsCategories)
                    setAssetData(assetData.data)
                } else {
                    toast.error(assetData.message, {
                        style: {
                            border: '1px solid #713200',
                            padding: '16px',
                            color: '#713200',
                        },
                        iconTheme: {
                            primary: '#713200',
                            secondary: '#FFFAEE',
                        },
                    });
                }
            })()
        } catch (error) {
            toast.error('Someting went Wrong...!', {
                style: {
                    border: '1px solid #713200',
                    padding: '16px',
                    color: '#713200',
                },
                iconTheme: {
                    primary: '#713200',
                    secondary: '#FFFAEE',
                },
            });
        }
    }, [])

    const updateAssets = async () => {
        try {
            const update = await updateAsset(assetData,token)
            if (update.updated) {
                const assets = await getAssets(token)
                dispatch(setAssets(assets.assets))
                toast.success(update.message, {
                    style: {
                        border: '1px solid #713200',
                        padding: '16px',
                        color: '#25ab11',
                    },
                    iconTheme: {
                        primary: '#25ab11',
                        secondary: '#FFFAEE',
                    },
                });
                closeModal()
            }
        } catch (error) {
            toast.error('Not Updated, Someting went Wrong...!', {
                style: {
                    border: '1px solid #713200',
                    padding: '16px',
                    color: '#713200',
                },
                iconTheme: {
                    primary: '#713200',
                    secondary: '#FFFAEE',
                },
            });
        }
    }
    return (
        <>
            <div className="modal-wrapper">
                <div className="modal-container">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="form-header">
                                <h3>Update Assets Category</h3>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Assets Category Name</label>
                                        <select name="assetCategory" id="categoryName"
                                            value={assetData.assetCategory}
                                        >
                                            <option value="">Select A Category</option>
                                            {assetCategory.map((values) => {
                                                return (
                                                    <option value={values._id}>{values.categoryName}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Assets Name</label>
                                        <input type="text" className='form-control' id='assetName'
                                            value={assetData.assetName} onChange={(e) => setAssetData({ ...assetData, assetName: e.target.value })} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Brand</label>
                                        <input type="text" className='form-control' id='brand'
                                            value={assetData.brand} onChange={(e) => setAssetData({ ...assetData, brand: e.target.value })} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Model Number</label>
                                        <input type="text" className='form-control' id='modelNo'
                                            value={assetData.modelNo} onChange={(e) => setAssetData({ ...assetData, modelNo: e.target.value })} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Code</label>
                                        <input type="text" className='form-control' id='code'
                                            value={assetData.code} onChange={(e) => setAssetData({ ...assetData, code: e.target.value })} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>In Stock</label>
                                        <input type="number" className='form-control' id='inStock'
                                            value={assetData.inStock} onChange={(e) => setAssetData({ ...assetData, inStock: e.target.value })} />
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label>Configuration</label>
                                        <input type="text" className='form-control' id='configuration'
                                            value={assetData.configuration} onChange={(e) => setAssetData({ ...assetData, configuration: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="modal-btn delete-action">
                                <div className="button">
                                    <div>
                                        <button className='btn btn-primary' onClick={updateAssets}>Update</button>
                                    </div>
                                    <div>
                                        <button className='btn btn-primary' onClick={closeModal}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditAssets