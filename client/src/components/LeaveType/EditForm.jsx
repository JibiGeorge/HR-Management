import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { getAllLeaveTypes, getUpdaingData, leaveTypeUpdate } from '../../helper/LeaveTypeHelper'
import { hideLoading, showLoading } from '../../redux/features/alertSlice'
import { setLeaveTypes } from '../../redux/features/leaveTypeSlice'

const EditForm = ({ closeModal, id }) => {
    const [updatingData, setUpdatingData] = useState('')
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.alerts)

    useEffect(() => {
        (async () => {
            try {
                const data = await getUpdaingData(id)
                setUpdatingData(data)
            } catch (error) {
                toast.error('Something Went Wrong..!', {
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
    }, [])

    const handleSubmit = async () => {
        dispatch(showLoading())
        try {
            const updating = await leaveTypeUpdate(updatingData)
            if (updating.success) {
                const leaveTypes = await getAllLeaveTypes();
                dispatch(setLeaveTypes(leaveTypes.allLeaveTypes))
                toast.success(updating.message, {
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
                dispatch(hideLoading())
            } else {
                toast.error(updating.message, {
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
            toast.error('Something Went Wrong..!', {
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
    }
    return (
        <>
            <div className="modal-wrapper">
                <div className="modal-container">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="form-header">
                                <h3>Update Leave Type</h3>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-sm-12 mb-2">
                                    <div className="form-group">
                                        <label>Name of the Leave</label>
                                        <input type="text" className='form-control' id='leaveType'
                                            value={updatingData.leaveType} onChange={(e) => setUpdatingData({ ...updatingData, leaveType: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="modal-btn delete-action">
                                <div className="row">
                                    {loading && <div class="d-flex justify-content-center">
                                        <div class="spinner-border text-primary" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>}
                                    {!loading &&
                                        <>
                                            <div className="col-6">
                                                <button className='btn btn-primary' onClick={handleSubmit}>Update</button>
                                            </div>
                                            <div className="col-6">
                                                <button className='btn btn-primary' onClick={closeModal}>Cancel</button>
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditForm