import { useFormik } from 'formik'
import React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { addAssetsCategory } from '../../helper/AssetsHelper'

const AddCategory = () => {

    const onSubmit = async (values) => {
        try {
            const addCategory = await addAssetsCategory(values)
            if (addCategory.success) {
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
                location.reload()
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
            <div><Toaster position="top-right" reverseOrder={false} /></div>
            <div class="modal fade" id="assetsCategoryAdd" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 className='modal-title'>Add Assets Category</h5>
                            <button type="button" class="btn btn-secondary close" data-bs-dismiss="modal">
                                <span>x</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label>Assets Category Name</label>
                                        <input type="text" className='form-control' id='categoryName' value={values.categoryName} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="submit-section">
                                <button loading={isSubmitting} className='btn btn-primary submit-btn' type='submit' onClick={handleSubmit}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddCategory