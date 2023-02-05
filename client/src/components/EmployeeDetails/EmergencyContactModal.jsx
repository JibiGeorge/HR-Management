import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
import { toast } from 'react-hot-toast';
import { getEmergencyContacts, updateEmployeeContactDetails } from '../../helper/Employeehelper';
import { setContacts } from '../../redux/features/contactsSlice';

const EmergencyContactModal = ({ closeModal, id }) => {
    const { loading } = useSelector(state => state.alerts);
    const {contacts} = useSelector(state => state.emergencyContacts);
    const dispatch = useDispatch()

    const onSubmit = async (values) => {
        dispatch(showLoading())
        try {
            const updateContacts = await updateEmployeeContactDetails(values, id);
            if (updateContacts.success) {
                const contacts = await getEmergencyContacts(id);
                dispatch(setContacts(contacts.contacts))
                toast.success(updateContacts.message, {
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
            } else {
                toast.error(updateContacts.message, {
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
            toast.error('Not Updated, Something Went Wrong..!', {
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

    const { values, setFieldValue, handleSubmit } = useFormik({
        initialValues: {
            primaryName: contacts?.primaryName,
            primaryRelation: contacts?.primaryRelation,
            primaryContactNumber: contacts?.primaryContactNumber,
            secondaryName: contacts?.secondaryName,
            secondaryRelation: contacts?.secondaryRelation,
            secondaryContactNumber: contacts?.secondaryContactNumber
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
                                <h3>Update Emergency Contact</h3>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="row">
                                        <span style={{ textAlign: 'center', fontWeight: '600', textDecoration: 'underline' }}>Primary Contacts</span>
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label>Name</label>
                                                <input type="text" className='form-control' id='primaryName'
                                                    value={values.primaryName}
                                                    onChange={(e) => setFieldValue('primaryName', e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label>Relation</label>
                                                <select id='primaryRelation' value={values.primaryRelation}
                                                    onChange={(e) => setFieldValue("primaryRelation", e.target.value)}>
                                                    <option>Select a Relation</option>
                                                    <option value="Father">Father</option>
                                                    <option value="Mother">Mother</option>
                                                    <option value="Brother">Brother</option>
                                                    <option value="Sister">Sister</option>
                                                    <option value="Spouse">Spouse</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label>Contact Number</label>
                                                <input type="text" className='form-control' id='primaryContactNumber'
                                                    value={values.primaryContactNumber}
                                                    onChange={(e) => setFieldValue('primaryContactNumber', e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="row">

                                        <span style={{ textAlign: 'center', fontWeight: '600', textDecoration: 'underline' }}>Secondary Contacts</span>
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label>Name</label>
                                                <input type="text" className='form-control' id='secondaryName'
                                                    value={values.secondaryName}
                                                    onChange={(e) => setFieldValue('secondaryName', e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label>Relation</label>
                                                <select id='secondaryRelation' value={values.secondaryRelation}
                                                    onChange={(e) => setFieldValue("secondaryRelation", e.target.value)}>
                                                    <option>Select a Relation</option>
                                                    <option value="Father">Father</option>
                                                    <option value="Mother">Mother</option>
                                                    <option value="Brother">Brother</option>
                                                    <option value="Sister">Sister</option>
                                                    <option value="Spouse">Spouse</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label>Contact Number</label>
                                                <input type="text" className='form-control' id='secondaryContactNumber'
                                                    value={values.secondaryContactNumber}
                                                    onChange={(e) => setFieldValue('secondaryContactNumber', e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="modal-btn delete-action">
                                {loading && <div className="d-flex justify-content-center">
                                    <div className="spinner-border text-primary" role='status'>
                                        <span className="sr-only">Lodaing...</span>
                                    </div>
                                </div>}
                                {!loading &&
                                    <div className="button">
                                        <div>
                                            <button className="btn-btn-primary" onClick={handleSubmit} >Save</button>
                                        </div>
                                        <div>
                                            <button className="btn-btn-primary" onClick={closeModal}>Cancel</button>
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

export default EmergencyContactModal