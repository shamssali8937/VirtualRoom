import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'
import './Signup.css';
import emailicon from './assets/Images/email.png'
import passicon from './assets/Images/password.png'


function Login()
{
    const navigate=useNavigate();
     const [data,setData]=useState({
        email:"",
        password:""
     });
    
    const handlesubmit=(event)=>{
        event.preventDefault();
        if(data.email&&data.password)
        {
            navigate("/Landpage");
        }

    };

    const handlechange = (event) => {
        const { name, value } = event.target;
        setData(prevdata => ({
            ...prevdata,
            [name]: value
        }));
    };


    return(
    <>
    <div className="container">
        <div className="header">
            <div className="text">Login</div>
             <div className="underline"></div>
        </div>
     
            <form onSubmit={handlesubmit} className="inputs">               
                <div className="input">
                <img src={emailicon} alt="email" />
                <input type="email" placeholder="Email" name="email" value={data.email} onChange={handlechange} required/>
                </div>
                <div className="input">
                <img src={passicon} alt="passwd" />
                <input type="password" placeholder="Password" name="password" value={data.password} onChange={handlechange} required/>
                </div>
                <div className="login">
                    <a href="" target="blank">Forgot Password</a>
                </div>
                <div className="login">
                    <Link to="/signup">Register?</Link>
                </div>
                <div className="submit-container">
                    <button  className="submit" type="submit">Login</button>
                </div>
            </form>
    </div>

    </>);
}

export default Login;