import React, { useState } from 'react'
import { useFormik } from 'formik'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { addNotice, getAllNotices } from '../../helper/NoticeHelper';
import { setAllNotices } from '../../redux/features/noticeSlice';

const AddForm = ({ closeModal }) => {
    const dispatch = useDispatch();
    const { userDetails } = useSelector(state => state.user);
    const [adding, setAdding] = useState(false);
    let token = userDetails.UserToken;

    const onSubmit = async (values) => {
        try {
            setAdding(true)
            const add = await addNotice(values, token);
            if (add.success) {
                const AllNotices = await getAllNotices(token);
                dispatch(setAllNotices(AllNotices.data));
                toast.success(add.message, {
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
                setAdding(false)
                closeModal();
            } else {
                toast.error(add.message, {
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
                closeModal();
                setAdding(false);
            }
        } catch (error) {
            toast.error('Not Added Please Try Again Later', {
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
            setAdding(false);
        }
    }
    const { values, handleSubmit, handleChange, setFieldValue } = useFormik({
        initialValues: {
            title: '',
            date: '',
            message: '',
            file: ''
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
                                <h3>Add Notice</h3>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-sm-12 mb-2">
                                    <div className="form-group">
                                        <label>Notice Title</label>
                                        <input type="text" className='form-control' placeholder='Notice Title' id='title'
                                            value={values.title} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="col-sm-12 mb-2">
                                    <div className="form-group">
                                        <label>Date</label>
                                        <input type="date" className='form-control' id='date'
                                            value={values.date} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="col-sm-12 mb-2">
                                    <div className="form-group">
                                        <label>Message</label>
                                        <input type="text" className='form-control' placeholder='Message' id='message'
                                            value={values.message} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="col-sm-12 mb-2">
                                    <div className="form-group">
                                        <label>Document</label>
                                        <div>
                                            <input type="file" name="file" id="file" class="inputfile"
                                                onChange={(e) => setFieldValue('file', e.target.files[0])} />
                                            <label for="file"><i class="las la-cloud-upload-alt me-2"></i>Choose a file</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="modal-btn delete-action">
                                <div className="row">
                                    <div className="col-6">
                                        <button className='btn btn-primary' onClick={handleSubmit}>
                                            {!adding && 'SAVE'}
                                            {adding && 'Uploading'}
                                            </button>
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

export default AddForm