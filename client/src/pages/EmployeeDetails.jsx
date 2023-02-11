import React from 'react'
import Employee from '../Components/EmployeeDetails/Body'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { getEmployeeData } from '../helper/Employeehelper'
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { setEmpIndividualData } from '../redux/features/employee'
import { getAllDepartments } from '../helper/Departmenthelper'
import { getAllDesignation } from '../helper/Designationhelper'
import { setDepartmentData } from '../redux/features/departmentSlice'
import { setDesignatonData } from '../redux/features/designationSlice'

function EmployeeDetails() {
    const dispatch = useDispatch();
    const location = useLocation();
    let empID = location.state?.id;
    const { userDetails } = useSelector(state => state.user);

    const token = userDetails.UserToken;
    useEffect(() => {
        (async () => {
            try {
                const employeeData = await getEmployeeData(empID, token);
                const departmentList = await getAllDepartments(token);
                const designationList = await getAllDesignation(token);
                let result = employeeData.data
                if (result.success) {
                    dispatch(setEmpIndividualData(result.data));
                    dispatch(setDepartmentData(departmentList));
                    dispatch(setDesignatonData(designationList.data));
                } else {
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
            <Employee />
        </>
    )
}

export default EmployeeDetails