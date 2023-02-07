import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllDesignation } from '../../helper/Designationhelper';
import { setDesignatonData } from '../../redux/features/designationSlice';
import { setLeaveTypes } from '../../redux/features/leaveTypeSlice';
import {hideLoading, showLoading} from '../../redux/features/alertSlice';
import {useFormik} from 'formik';
import { toast } from 'react-hot-toast';
import { addJobRoleLeaves, getAllJobRolesLeavesData } from '../../helper/JobRoleLeaves';
import { getAllLeaveTypes } from '../../helper/LeaveTypeHelper';
import { setJobRoleLeaves } from '../../redux/features/jobRoleLeavesSlice';

const AddLeavesModal = ({ closeModal }) => {
    const dispatch = useDispatch();
    const { designationDetails } = useSelector(state => state.designation)
    const { leaveType } = useSelector(state => state.leaveType);
    const {loading} = useSelector(state => state.alerts)

    useEffect(() => {
        (async () => {
            try {
                const designation = await getAllDesignation();
                const leaveTypes = await getAllLeaveTypes();
                if (designation.success && leaveTypes.success) {
                    dispatch(setDesignatonData(designation.data));
                    dispatch(setLeaveTypes(leaveTypes.allLeaveTypes));
                } else {
                    toast.error('Internal Server Error....!', {
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
                toast.error('Some Error Occurs..!', {
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
        })();
    }, []);

    const onSubmit = async (values) =>{
        dispatch(showLoading());
        try {
            const addLeaves = await addJobRoleLeaves(values)
            if(addLeaves.success){
                const jobRoleLeaves = await getAllJobRolesLeavesData();
                if (jobRoleLeaves.success) {
                    dispatch(setJobRoleLeaves(jobRoleLeaves.data));
                }
                toast.success(addLeaves.message, {
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
                dispatch(hideLoading());
            }else{
                toast.error(addLeaves.message, {
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
            }
        } catch (error) {
            toast.error('Not Added. Some Error Occur..!', {
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

    const {values, handleSubmit, handleChange} = useFormik({
        initialValues: {
            designation: '',
            leaveType: '',
            days: ''
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
                                <h3>Add Leaves</h3>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-lg-12 col-sm-12 col-xl-12 mb-3">
                                    <div className="form-group">
                                        <label>Job Position</label>
                                        <select id='designation' value={values.designation}
                                        onChange={handleChange} >
                                            <option value="">Select A Designation</option>
                                            {designationDetails.map(values => {
                                                return (
                                                    <option value={values._id}>{values.designation}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-sm-12 col-xl-12 mb-3">
                                    <div className="form-group">
                                        <label>Leave Type</label>
                                        <select id='leaveType' value={values.leaveType}
                                        onChange={handleChange} >
                                            <option value="">Select A Leave Type</option>
                                            {leaveType.map(values => {
                                                return (
                                                    <option value={values._id}>{values.leaveType}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-sm-12 col-xl-12 mb-3">
                                    <div className="foirm-group">
                                        <label>Number of Days</label>
                                        <input type="number" className='form-control' id='days'
                                        value={values.days} onChange={handleChange} />
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
                                        <button className="btn btn-primary" onClick={handleSubmit}>SAVE</button>
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

export default AddLeavesModal