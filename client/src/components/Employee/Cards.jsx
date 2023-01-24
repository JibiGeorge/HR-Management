import React, { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllEmployees } from '../../helper/Employeehelper';
import { setEmployeesData } from '../../redux/features/employee';

function Cards() {
    const dispatch = useDispatch();
    const { employeesDetails } = useSelector(state => state.employees)

    useEffect(() => {
        (async () => {
            try {
                const employeeList = await getAllEmployees();
                if (employeeList.success) {
                    dispatch(setEmployeesData(employeeList.list))
                } else if (employeeList.message == 'No Data') {
                    dispatch(setEmployeesData(''))
                    toast.error('No Data Founded....!', {
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
                } else {
                    toast.error('Internal Server Ersssror....!', {
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
        })();
    }, [])


    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <div className="row">
                {employeesDetails ? employeesDetails.map(values => {
                    return (
                        <div className="col-md-4 col-sm-6 col-lg-4 col-xl-3">
                            <div className="profile-widget">
                                <div className="profile-img">
                                    <a href="" className='avatar'>
                                        <img src={values.image} alt="" />
                                    </a>
                                </div>
                                <h4 className="user-name mt-10 mb-0 text-ellipsis">
                                    <Link to='/employeeDetails'>{values.firstName} {values.lastName}</Link>
                                </h4>
                                <div className="small text-muted">{values.contactNumber}</div>
                            </div>
                        </div>
                    )
                }) : (''
                )}
            </div>
        </>
    )
}

export default Cards