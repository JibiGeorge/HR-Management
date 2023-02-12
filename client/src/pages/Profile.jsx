import React, { useEffect } from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import ProfileContent from '../components/Profile.jsx/ProfileContent'
import { getAllDepartments } from '../helper/Departmenthelper';
import { getAllDesignation } from '../helper/Designationhelper';
import { getEmployeeData } from '../helper/Employeehelper';
import { setDepartmentData } from '../redux/features/departmentSlice';
import { setDesignatonData } from '../redux/features/designationSlice';
import { setEmpIndividualData } from '../redux/features/employee';

const Profile = () => {
    const dispatch = useDispatch();
    const { userDetails } = useSelector(state => state.user);
    const empID = userDetails._id;

    const token = userDetails.UserToken;
    console.log('empID',empID);
    console.log('token',token);
    useEffect(() => {
        (async () => {
            try {
                const employeeData = await getEmployeeData(empID, token);
                console.log('=====',employeeData);
                const departmentList = await getAllDepartments(token);
                const designationList = await getAllDesignation(token);
                let result = employeeData.data
                if (result.success) {
                    dispatch(setEmpIndividualData(result.data));
                    dispatch(setDepartmentData(departmentList));
                    dispatch(setDesignatonData(designationList.data));
                } else {
                    toast.error(result.data.message, {
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
                console.log(error.message);
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
  <ProfileContent/>
  </>
  )
}

export default Profile