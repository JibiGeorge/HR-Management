import { useFormik } from 'formik'
import React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { addAssetsCategory, getAllAssetsCategory } from '../../helper/AssetsHelper'
import { setAssetsCategories } from '../../redux/features/assetsCategorySlice'
import { assetCategorySchema } from '../../schemas/assetCategorySchema'

const AddCategory = ({ closeModal }) => {
    const dispatch = useDispatch();
    const { userDetails } = useSelector(state => state.user);

    const onSubmit = async (values) => {
        let token = userDetails.UserToken
        try {
            const addCategory = await addAssetsCategory(values,token)
            if (addCategory.success) {
                const categories = await getAllAssetsCategory(token);
                dispatch(setAssetsCategories(categories))
                toast.success(addCategory.message, {
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
            } else if (addCategory.exist) {
                toast.error(addCategory.message, {
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
                toast.error(addCategory.message, {
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

    const { values, handleChange, handleSubmit, errors, isSubmitting, touched } = useFormik({
        initialValues: {
            categoryName: ''
        },
        validationSchema: assetCategorySchema,
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
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label>Assets Category Name
                                        <span className="text-danger me-2">*</span>
                                            {errors.categoryName && touched.categoryName && <span className='error'>{errors.categoryName}</span>}
                                        </label>
                                        <input type="text"  id='categoryName'
                                        value={values.categoryName} onChange={handleChange} className= {`form-control ${errors.categoryName && touched.categoryName ? "input-error" : ""}`}  />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="modal-btn delete-action">
                                <div className="row">
                                    <div className="col-6">
                                        <button className='btn btn-primary' onClick={handleSubmit}>Save</button>
                                    </div>
                                    <div className="col-6">
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

export default AddCategory