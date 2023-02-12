import { useFormik } from 'formik';
import React from 'react'
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux'
import { updateCredentialPassword } from '../../helper/CredentialHelper';
import { passwordSchema } from '../../schemas/passwordSchema';

const ChangePassword = ({ closeModal, id, token }) => {
    const { loading } = useSelector(state => state.alerts);

    const onSubmit = async (values) => {
        try {
            const update = await updateCredentialPassword(values, id, token)
            if (update.success) {
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
                closeModal();
            } else {
                toast.error(update.message, {
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
            toast.error('Password Update Faild..!', {
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

    const { values, handleSubmit, errors, handleChange, touched } = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: ''
        },
        validationSchema: passwordSchema,
        onSubmit
    })
    return (
        <>
            <div className="modal-wrapper">
                <div className="modal-container">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="form-header">
                                <h3>Change Password</h3>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Old Password</label>
                                        <span className="text-danger me-2">*</span>
                                        {errors.oldPassword && touched.oldPassword && <span className='error'>{errors.oldPassword}</span>}
                                        <input type="password" id='oldPassword'
                                            value={values.oldPassword} onChange={handleChange}
                                            className={`form-control ${errors.oldPassword && touched.oldPassword ? "input-error" : ""}`} />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>New Password</label>
                                        <span className="text-danger me-2">*</span>
                                        {errors.newPassword && touched.newPassword && <span className='error'>{errors.newPassword}</span>}
                                        <input type="password" id='newPassword'
                                            value={values.newPassword} onChange={handleChange}
                                            className={`form-control ${errors.newPassword && touched.newPassword ? "input-error" : ""}`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="modal-btn delete-action">
                                {loading && <div class="d-flex justify-content-center">
                                    <div class="spinner-border text-primary" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>}
                                {!loading &&
                                    <div className="button">
                                        <div>
                                            <button className='btn btn-primary' onClick={handleSubmit}>Update</button>
                                        </div>
                                        <div>
                                            <button className='btn btn-primary' onClick={closeModal} >Cancel</button>
                                        </div>
                                    </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default ChangePassword