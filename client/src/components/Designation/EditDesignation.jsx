import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllDepartments } from '../../helper/Departmenthelper';
import { setDepartmentData } from '../../redux/features/departmentSlice';
import { useFormik } from 'formik'
import { toast } from 'react-hot-toast';
import { getAllDesignation, updateDesignation } from '../../helper/Designationhelper';
import { setDesignatonData } from '../../redux/features/designationSlice';

const EditDesignation = ({ updatingData, closeEditDesignationModal }) => {
    const { departmentDetails } = useSelector(state => state.department);
    const { userDetails } = useSelector(state => state.user);
    const token = userDetails.UserToken;
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            try {
                const departmentData = await getAllDepartments(token);
                dispatch(setDepartmentData(departmentData))
            } catch (error) {
            }
        })();
    }, []);

    const onSubmit = async (values) => {
        try {
            const update = await updateDesignation(token, values)
            if (update.success) {
                const data = await getAllDesignation(token)
                dispatch(setDesignatonData(data.data));
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
                closeEditDesignationModal();
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
            toast.error('Not Updated. Something Went Wrong..!', {
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

    const { values, handleSubmit, handleChange } = useFormik({
        initialValues: {
            docID: updatingData.docID,
            designationName: updatingData.designation,
            departmentID: updatingData.departmentID
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
                                <h3>Update Designation</h3>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-sm-12 mb-2">
                                    <div className="form-group">
                                        <label>Department Name</label>
                                        <select className='form-select' id='departmentID'
                                            value={values.departmentID}
                                            onChange={handleChange}
                                        >
                                            <option value="" selected>Select A Department</option>
                                            {departmentDetails?.map(res => {
                                                return (
                                                    <option value={res?._id}>{res?.department}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-sm-12 mb-2">
                                    <div className="form-group">
                                        <label>Department Name</label>
                                        <input type="text" className='form-control' id='designationName'
                                            value={values.designationName}
                                            onChange={handleChange}
                                        />
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
                                        <button className='btn btn-primary' onClick={closeEditDesignationModal}>Cancel</button>
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

export default EditDesignation