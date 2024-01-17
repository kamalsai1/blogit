import React from 'react'
import './RegisterPage.css'
import { Link,useNavigate } from 'react-router-dom'
import {useState} from 'react';
import axios from 'axios';
import Header from '../Header'

const RegisterPage = () => {
    const [data, setData] = useState({username: "", email:"", password: "" });
    const updateData = (e) => {
        setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
    const navigate = useNavigate();
    const formSubmitter = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`https://blogit-backend-tmf9.onrender.com/api/users/register`, data);
            // alert("Registration Successful")
            navigate('/login');
        }
        catch(error){
            alert("Registration Failed");
        }
    }
    return (
        <div>
            <Header />
            <div className='loginBox'>
                <h1>Register</h1>
                <form onSubmit={formSubmitter}>
                    <input type='text' placeholder='email' name='email' required onChange={updateData}/>
                    <input type='text' placeholder='username' name='username' required onChange={updateData}/>
                    <input type='password' placeholder='password' name='password' required onChange={updateData}/>
                    <button>Register</button>
                    {/* <p className='errorMessage'>This is an error!</p> */}
                    <span>Already have an account? <Link to='/login'>Login Here</Link></span>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage