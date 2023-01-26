import React from 'react'
import Header from '../components/header/Header'
import Sidebar from '../Components/Sidebar/Sidebar'
import Employee from '../Components/EmployeeDetails/Body'
import { useLocation, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { getEmployeeData } from '../helper/Employeehelper'
import toast,{ Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setEmpIndividualData } from '../redux/features/employee'

function EmployeeDetails() {
    const dispatch = useDispatch();
    const location = useLocation();
    let empID = location.state?.id;
    useEffect(() => {
        (async () => {
            try {
                const employeeData = await getEmployeeData(empID)
                let result = employeeData.data
                if(result.success){
                    dispatch(setEmpIndividualData(result.data))
                }else{
                    toast.error('result.data.message', {
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
                toast.error('Some Server Issue....!', {
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
            <Sidebar />
            <Header />
            <Employee />
        </>
    )
}

export default EmployeeDetails