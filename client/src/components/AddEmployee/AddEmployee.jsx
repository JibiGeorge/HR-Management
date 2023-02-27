import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getEmpCode } from '../../helper/Employeehelper';
import AddForm from './AddForm'
import PageHeader from './PageHeader'
import './Style.css'

function AddEmployee() {
  const { userDetails } = useSelector(state => state.user);
  const navigate = useNavigate();
  const [empCode, setEmpCode] = useState(null);
  const token = userDetails.UserToken;
  useEffect(() => {
    (async () => {
      try {
        const newEmpCode = await getEmpCode(token);
        if (newEmpCode.success) {
          setEmpCode(newEmpCode.nextEmployeeCode)
        } else {
          navigate('/hr/employee');
          toast.error(newEmpCode.message, {
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
        navigate('/hr/employee');
        toast.error('Something got wrong', {
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
    <div class="section-body form-content">
      <PageHeader />
      <AddForm empCode={empCode} />
    </div>
  )
}

export default AddEmployee