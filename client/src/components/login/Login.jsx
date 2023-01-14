import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Login.css'

function Login() {

    const navigate = useNavigate();
  const handleLogin= ()=>{
    navigate('/dashboard')
  }

  return (
    <div className="login">
      <div className="conatiner-fluid">
        <div className="wrapper">
        <div className="title">
          <h3>LOGIN</h3>
        </div>
        <div>
          <form onSubmit={handleLogin}>
            <div className="row">
              <i className="fa-sold fa-user"></i>
              <input type="text" placeholder='User Name' />
            </div>
            <div className="row">
              <i className="fa-solid fa-lock"></i>
              <input type="password" placeholder='Password'/>
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