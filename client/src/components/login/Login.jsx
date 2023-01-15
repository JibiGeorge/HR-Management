import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Login.css'
import {useFormik} from 'formik'
import {loginUser} from '../../helper/Userhelper.js'

function Login() {

  const navigate = useNavigate();

    const formik = useFormik({
      initialValues: {
        username: '',
        password: ''
      },
      onSubmit: async values =>{
        const res = await loginUser(values)
        console.log("res",res);
        if(res.loggedIn){
          navigate('/dashboard');
        }else{
          console.log("not");
        }
      }
    })

  return (
    <div className="login">
      <div className="conatiner-fluid">
        <div className="wrapper">
        <div className="title">
          <h3>LOGIN</h3>
        </div>
        <div>
          <form onClick={formik.handleSubmit} >
            <div className="row">
              <i className="fa-sold fa-user"></i>
              <input type="text" placeholder='User Name' {...formik.getFieldProps('username')} />
            </div>
            <div className="row">
              <i className="fa-solid fa-lock"></i>
              <input type="password" placeholder='Password' {...formik.getFieldProps('password')}/>
            </div>
            <div className="row">
              <button className='button' type="submit">LOGIN</button>
            </div>
          </form>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Login