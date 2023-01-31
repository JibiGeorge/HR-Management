import { useFormik } from 'formik'
import React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { addAssetsCategory, getAllAssetsCategory } from '../../helper/AssetsHelper'
import { setAssetsCategories } from '../../redux/features/assetsCategorySlice'

const AddCategory = ({closeModal}) => {
    const dispatch = useDispatch()

    const onSubmit = async (values) => {
        try {
            const addCategory = await addAssetsCategory(values)
            if (addCategory.success) {
                const categories = await getAllAssetsCategory();
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

    const { values, handleChange, handleSubmit, isSubmitting } = useFormik({
        initialValues: {
            categoryName: ''
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
                            <div className="col-sm-12">
                                    <div className="form-group">
                                        <label>Assets Category Name</label>
                                        <input type="text" className='form-control' id='categoryName' value={values.categoryName} onChange={handleChange} />
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