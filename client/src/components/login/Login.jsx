import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Login.css'
import { useFormik } from 'formik'
import { loginUser } from '../../helper/Userhelper.js'
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../../redux/features/userLogin'
import toast, { Toaster } from 'react-hot-toast';
import { getCompanyProfile } from '../../helper/CompanySettingsHelper';
import { setCompanyProfileData } from '../../redux/features/companyProfileSlice';
import { loginSchema } from '../../schemas/loginSchema';

function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [btnLoading, setBtnLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: loginSchema,
    onSubmit: async values => {
      setBtnLoading(true);
      const res = await loginUser(values)
      if (res.loggedIn) {
        const data = await getCompanyProfile(res.UserToken);
        if (data.success) {
          dispatch(setCompanyProfileData(data.details));
        }
        dispatch(setUserDetails(res));
        navigate('/hr/dashboard');
        setBtnLoading(false);
      } else {
        toast.error(res.error, {
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
        setBtnLoading(false);
      }
    }
  })

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <div className="login">
        <div className="forms-container">
          <div className="login-form">
            <form className="form">
              <h2 className='title'>LOGIN</h2>
              <span>{formik.errors.username && formik.touched.username && <span className='error'>{formik.errors.username}</span>}</span>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" placeholder='Username' id='username' {...formik.getFieldProps('username')} />
              </div>
              <span>{formik.errors.password && formik.touched.password && <span className='error'>{formik.errors.password}</span>}</span>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder='Password' id='password' {...formik.getFieldProps('password')} />
              </div>
              <button type="submit" className='btn solid' onClick={formik.handleSubmit} >
                {btnLoading && 'Checking...'}
                {!btnLoading && 'LOGIN'}</button>
            </form>
          </div>
        </div>
        <div className="panels-container">
          <div className="panel">
            <div className="content">
              <h3>High Range Coffee Curing Pvt. Ltd.</h3>
              <p>HR Management</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login