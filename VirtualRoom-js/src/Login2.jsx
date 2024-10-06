import React from "react";
import { Link } from 'react-router-dom';
import { useState } from 'react'
import './Signup.css';
import emailicon from './assets/Images/email.png'
import passicon from './assets/Images/password.png'


function Login()
{
    return(
    <>
    <div className="container">
        <div className="header">
            <div className="text">Login</div>
             <div className="underline"></div>
        </div>
     
            <form action="Post" className="inputs">               
                <div className="input">
                <img src={emailicon} alt="email" />
                <input type="email" placeholder="Email" required/>
                </div>
                <div className="input">
                <img src={passicon} alt="passwd" />
                <input type="password" placeholder="Password" required/>
                </div>
                <div className="login">
                    <a href="" target="blank">Forgot Password</a>
                </div>
                <div className="login">
                    <Link to="/signup">Register?</Link>
                </div>
                <div className="submit-container">
                    <button href="" className="submit" type="submit">Login</button>
                </div>
            </form>
    </div>

    </>);
}

export default Login;