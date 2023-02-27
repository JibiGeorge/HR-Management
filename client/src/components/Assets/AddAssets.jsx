import { useFormik } from 'formik'
import React from 'react'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { addAssets, getAssets, getAllAssetsCategory } from '../../helper/AssetsHelper'
import { setAssetsCategories } from '../../redux/features/assetsCategorySlice'
import { setAssets } from '../../redux/features/assetsSlice'

const AddAssets = ({ closeModal }) => {
    const dispatch = useDispatch();
    const { category } = useSelector(state => state.assetsCategory);
    const {userDetails} = useSelector(state => state.user);
    const token = userDetails.UserToken;
    
    useEffect(() => {
        (async () => {
            const assetCategory = await getAllAssetsCategory(token);
            dispatch(setAssetsCategories(assetCategory));
        })();
    }, []);

    const onSubmit = async (values) => {
        try {
            const response = await addAssets(values,token);
            if (response.success) {
                const assets = await getAssets(token)
                dispatch(setAssets(assets.assets))
                toast.success(response.message, {
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
            } else if (response.exist) {
                toast.error(response.message, {
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
            } else {
                toast.error(response.message, {
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
        } catch (error) {
            toast.error('Smomething Wrong...!', {
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

    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: {
            assetCategory: '',
            assetName: '',
            brand: '',
            modelNo: '',
            code: '',
            inStock: '',
            configuration: ''
        },
        onSubmit
    })
    return (
        <>
            <div className="modal-wrapper">
                <div className="modal-container">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="form-header">
                                <h3>Add Assets Category</h3>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Assets Category Name</label>
                                        <select name="assetCategory" id="categoryName"
                                            value={values.categoryName}
                                            onChange={handleChange} >
                                            <option value="">Select A Category</option>
                                            {category?.map((values) => {
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
                                            value={values.assetName}
                                            onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Brand</label>
                                        <input type="text" className='form-control' id='brand'
                                            value={values.brand}
                                            onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Model Number</label>
                                        <input type="text" className='form-control' id='modelNo'
                                            value={values.modelNo}
                                            onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Code</label>
                                        <input type="text" className='form-control' id='code'
                                            value={values.code}
                                            onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>In Stock</label>
                                        <input type="number" className='form-control' id='inStock'
                                            value={values.inStock}
                                            onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label>Configuration</label>
                                        <input type="text" className='form-control' id='configuration'
                                            value={values.configuration}
                                            onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="modal-btn delete-action">
                                <div className="button">
                                    <div>
                                        <button className='btn btn-primary' onClick={handleSubmit} >Save</button>
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

export default AddAssets