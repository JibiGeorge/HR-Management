import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDepartments } from '../../helper/Departmenthelper';
import { addDesignation, getAllDesignation } from '../../helper/Designationhelper';
import { setDepartmentData } from '../../redux/features/departmentSlice';
import { setDesignatonData } from '../../redux/features/designationSlice';

const AddDesignation = ({ closeAddDesignationModal }) => {
    const { departmentDetails } = useSelector(state => state.department);
    const { userDetails } = useSelector(state => state.user);
    const token = userDetails.UserToken;
    const dispatch = useDispatch();

    const initialValue = {
        departmentId: "",
        designation: ""
    }

    const [designationData, setDesignationData] = useState(initialValue);

    useEffect(() => {
        (async () => {
            try {
                const departmentData = await getAllDepartments(token);
                dispatch(setDepartmentData(departmentData))
            } catch (error) {
            }
        })();
    }, []);

    // Handle Add Designation
    const handleDesignationSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addDesignation({ designationData, token });
            if (response.success) {
                const data = await getAllDesignation(token)
                dispatch(setDesignatonData(data.data));
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
                closeAddDesignationModal();
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
            toast.error(error.message, {
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
                                <h3>Add Designation</h3>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-sm-12 mb-2">
                                    <div className="form-group">
                                        <label>Department Name</label>
                                        <select className='form-select' aria-label='Default select example'
                                            value={designationData.departmentId}
                                            onChange={e => setDesignationData({ ...designationData, departmentId: e.target.value })}>
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
                                        <label>Designation Name</label>
                                        <input type="text" className='form-control' id='nameOfTheHoliday'
                                            value={designationData.designation} onChange={e => setDesignationData({ ...designationData, designation: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="modal-btn delete-action">
                                <div className="row">
                                    <div className="col-6">
                                        <button className='btn btn-primary' onClick={handleDesignationSubmit}>Save</button>
                                    </div>
                                    <div className="col-6">
                                        <button className='btn btn-primary' onClick={closeAddDesignationModal}>Cancel</button>
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

export default AddDesignation