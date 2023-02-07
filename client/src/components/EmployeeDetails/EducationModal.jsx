import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { hideLoading, showLoading } from '../../redux/features/alertSlice'
import { toast } from 'react-hot-toast'
import { allEducationsDetails, updateEducations } from '../../helper/Employeehelper'
import { setEducations } from '../../redux/features/educationSlice'

const EducationModal = ({ closeModal, empID }) => {
    const dispatch = useDispatch();

    const { loading } = useSelector(state => state.alerts);
    const {userDetails} = useSelector(state => state.user);

    const token = userDetails.UserToken;

    const onSubmit = async (values) => {
        dispatch(showLoading());
        try {
            const update = await updateEducations(values, empID,token);
            if (update.success) {
                const educations = await allEducationsDetails(empID,token);
                if(educations.success){
                    dispatch(setEducations(educations.getEducationData))
                }
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
                dispatch(hideLoading())
            } else if (update.exist) {
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
                dispatch(hideLoading())
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
                dispatch(hideLoading());
            }
        } catch (error) {
            console.log(error.message);
            toast.error('Not Updated. Something Wrong..!', {
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
            dispatch(hideLoading());
        }
    }

    const { values, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            collegeName: '',
            courseName: '',
            startFrom: '',
            endto: ''
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
                                <h3>Update Educations</h3>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>College Name / University Name</label>
                                        <input type="text" className='form-control' id='collegeName'
                                            value={values.collegeName}
                                            onChange={(e) => setFieldValue("collegeName", e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Course Name</label>
                                        <input type="text" className='form-control' id='courseName'
                                            value={values.courseName}
                                            onChange={(e) => setFieldValue("courseName", e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>Start from</label>
                                                <input type="date" className='form-control' id='startFrom'
                                                    value={values.startFrom}
                                                    onChange={(e) => setFieldValue("startFrom", e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>End to</label>
                                                <input type="date" className='form-control' id='endto'
                                                    value={values.endto}
                                                    onChange={(e) => setFieldValue("endto", e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="modal-btn delete-action">
                                {loading && <div className="d-flex justify-content-center">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>}
                                {!loading &&
                                    <div className="button">
                                        <div>
                                            <button className="btn btn-primary" onClick={handleSubmit}>Save</button>
                                        </div>
                                        <div>
                                            <button className="btn btn-primary" onClick={closeModal}>Cancel</button>
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

export default EducationModal