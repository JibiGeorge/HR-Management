import React, { useEffect, useState } from 'react'
import Filter from './Filter'
import PageHeader from './Header'
import './Employee.css'
import Cards from './Cards'
import { toast } from 'react-hot-toast'
import { getAllEmployees } from '../../helper/Employeehelper'
import { useDispatch, useSelector } from 'react-redux'
import { setEmployeesData } from '../../redux/features/employee'
import { hideLoading, showLoading } from '../../redux/features/alertSlice'
import { getAllDepartments } from '../../helper/Departmenthelper'
import { getAllDesignation } from '../../helper/Designationhelper'
import { setDepartmentData } from '../../redux/features/departmentSlice'
import { setDesignatonData } from '../../redux/features/designationSlice'

function Employee() {
  const { userDetails } = useSelector(state => state.user);
  const { employeesDetails } = useSelector(state => state.employees);
  const { departmentDetails } = useSelector(state => state.department);
  const { designationDetails } = useSelector(state => state.designation);
  const { loading } = useSelector(state => state.alerts);
  const role = userDetails.role;
  const token = userDetails.UserToken;
  const dispatch = useDispatch();

  const [filteredData, setFilteredData] = useState(employeesDetails);

  useEffect(() => {
    Promise.all([getAllDepartments(token), getAllDesignation(token)])
      .then(([response1, response2]) => {
        dispatch(setDepartmentData(response1))
        dispatch(setDesignatonData(response2.data))
      })
  }, [])

  useEffect(() => {
    dispatch(showLoading());
    (async () => {
      try {
        const employeeList = await getAllEmployees(token);
        if (employeeList.success) {
          dispatch(setEmployeesData(employeeList.list));
          dispatch(hideLoading());
        } else {
          toast.error(employeeList.message, {
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
        dispatch(hideLoading());
      }
    })();
  }, []);

  const handelFilterWithID = (e) => {
    const inputData = e.target.value;
    let newFilteredData;
    if (inputData === '') {
      newFilteredData = employeesDetails;
    } else {
      newFilteredData = employeesDetails.filter((values) => {
        return values.empCode === inputData;
      })
    }
    return setFilteredData(newFilteredData)
  }

  const handleFilterWithName = (e) => {
    const inputData = e.target.value;
    const newFilteredData = employeesDetails.filter((values) => {
      return values._id.includes(inputData)
    })
    return setFilteredData(newFilteredData)
  }

  const handleFilterWithDepartment = (e) => {
    const inputData = e.target.value;
    const newFilteredData = employeesDetails.filter((values) => {
      return values.department.includes(inputData)
    })
    return setFilteredData(newFilteredData)
  }

  const handleFilterWithDesignation = (e) => {
    const inputData = e.target.value;
    const newFilteredData = employeesDetails.filter((values) => {
      return values.designation.includes(inputData)
    })
    return setFilteredData(newFilteredData)
  }

  return (
    <div class="section-body employee">
      <PageHeader />
      {loading && <div class="d-flex justify-content-center">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>}
      {!loading &&
        <>
          <Filter employeesDetails={employeesDetails} departmentDetails={departmentDetails} designationDetails={designationDetails}
            handelFilterWithID={handelFilterWithID} handleFilterWithName={handleFilterWithName} handleFilterWithDepartment={handleFilterWithDepartment}
            handleFilterWithDesignation={handleFilterWithDesignation} />
          <Cards employeesDetails={filteredData} role={role} />
        </>
      }
    </div>
  )
}

export default Employee