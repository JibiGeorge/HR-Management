import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { employeeAddressAdd, getEmployeeAddressData } from '../../helper/Employeehelper'
import { hideLoading, showLoading } from '../../redux/features/alertSlice'
import { setEmployeeAddress } from '../../redux/features/employeeAddress'

const EditAddress = ({ closeModal, id }) => {
    const { loading } = useSelector(state => state.alerts)
    const [updatingData, setUpdatingData] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            const address = await getEmployeeAddressData(id)
            if (address.success) {
                setUpdatingData(address.allAddress)
            }
        })()
    }, [])

    const handleAddressUpdate = async () => {
        dispatch(showLoading())
        try {
            const addAddress = await employeeAddressAdd(updatingData, id)
            if (addAddress.success) {
                const address = await getEmployeeAddressData(id)
                if (address.success) {
                    dispatch(setEmployeeAddress(address.allAddress))
                }
                toast.success(addAddress.message, {
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
            }else{
                toast.error(addAddress.message, {
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
                  closeModal()
                  dispatch(hideLoading())
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
                                <h3>Update Address</h3>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Permanent Address</label>
                                        <textarea class="form-control" placeholder="Permanent Address"
                                            value={updatingData.permanentAddress}
                                            onChange={(e)=> setUpdatingData({...updatingData, permanentAddress: e.target.value})}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Temprory Address</label>
                                        <textarea class="form-control" placeholder="Temprory Address"
                                            value={updatingData.temproryAddress}
                                            onChange={(e)=> setUpdatingData({...updatingData, temproryAddress: e.target.value})}
                                        ></textarea>
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
                                            <button className='btn btn-primary' onClick={handleAddressUpdate}>Update</button>
                                        </div>
                                        <div>
                                            <button className='btn btn-primary' onClick={closeModal}>Cancel</button>
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

export default EditAddress