import React from 'react'
import './LoginPage.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios';
import Header from '../Header'
import { AuthContext } from '../../context/authContext';
import { useContext } from 'react';

const LoginPage = () => {
  const [data,setData] = useState({username:"",password:""});
  const updateData=(e)=>{
    setData(prev=>({...prev,[e.target.name]:e.target.value}));
  }
  const {login} = useContext(AuthContext);
  const navigate = useNavigate();
  const formSubmitter=async(e)=>{
    e.preventDefault();
    try{
      const res = await login(data);
      navigate('/');
    }
    catch(error){
      console.log(error);
      alert("Login Failed");
    }
      // await axios.post(`http://localhost:5001/api/users/login`,data,{withCredentials:true}).then((res)=>{
      //   if(res.status===200){
      //     // alert("Login Successful");
      //     navigate('/');
      //   }
      //   else{
      //     alert("Login Failed due to invalid credentials");
      //   }
      // })
  }
  return (
    <div>
      <Header />
      <div className='loginBox'>
        <h1>Login</h1>
        <form onSubmit={formSubmitter}>
          <input type='text' placeholder='username' name='username' required onChange={updateData}/>
          <input type='password' placeholder='password' name='password' required onChange={updateData}/>
          <button type='submit'>Login</button>
          {/* <p className='errorMessage'>This is an error!</p> */}
          <span>Don't have an account? <Link to='/register'>Register Here</Link></span>
        </form>
      </div>
    </div>
  )
}

export default LoginPage