import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { allEducationsDetails } from '../../helper/Employeehelper';
import { setEducations } from '../../redux/features/educationSlice';
import EducationModal from './EducationModal'

function Row3(props) {
    const profileData = props.profile;
    const empID = profileData._id;
    const dispatch = useDispatch()

    const { education } = useSelector(state => state.education);
    const educationData = education?.education;
    const { userDetails } = useSelector(state => state.user);
    const token = userDetails.UserToken;

    const [showEducationModal, setShowEducationModal] = useState(false)
    const closeEducationModal = () => setShowEducationModal(false)

    useEffect(() => {
        (async () => {
            try {
                const educations = await allEducationsDetails(empID, token);
                if (educations.success) {
                    dispatch(setEducations(educations.getEducationData))
                } else {
                    toast.error(educations.message, {
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
                toast.error('Something Went Problem..!', {
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
    return (
        <>
            <div className="row box">
                <div className="col-lg-6 box1">
                    <div className='row3'>
                        <div className="edit">
                            <button className='edit-btn' onClick={() => setShowEducationModal(true)}>
                                <i className='fa fa-pencil'></i>
                            </button>
                        </div>
                        <h3 className='title'>Education Informations</h3>
                        <div className="bar-line">
                            <ul className="list">
                                {educationData?.map(values => {
                                    return (

                                        <li>
                                            <div className="pro">
                                                <div className="circle"></div>
                                            </div>
                                            <div className="content">
                                                <p>{values?.collegeName}</p>
                                                <p>{values?.courseName}</p>
                                                <p>{new Date(values?.startFrom).getFullYear()} - {new Date(values?.endto).getFullYear()}</p>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 box1">
                    <div className='row3'>
                        <div className="edit">
                            <button className='edit-btn'>
                                <i className='fa fa-pencil'></i>
                            </button>
                        </div>
                        <h3 className='title'>Experience</h3>
                        <div className="bar-line">
                            <ul className="list">
                                <li>
                                    <div className="pro">
                                        <div className="circle"></div>
                                    </div>
                                    <div className="content">
                                        <p>Job Position</p>
                                        <p>Year</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {showEducationModal && <EducationModal closeModal={closeEducationModal} empID={empID} />}
        </>
    )
}

export default Row3