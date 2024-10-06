import React from "react";
import { useState } from 'react'
import './Signup.css';
import user from "./assets/Images/person.png"
import emailicon from './assets/Images/email.png'
import passicon from './assets/Images/password.png'

function Signup()
{
    return(
    <>
    <div className="container">
        <div className="header">
            <div className="text">Signup</div>
             <div className="underline"></div>
        </div>
     
            <form action="Post" className="inputs">
                <div className="input">
                <img src={user} alt="user" />
                <input type="text" placeholder="Name" />
                </div>
                <div className="input">
                <img src={user} alt="user" />
                <input type="text" placeholder="Username" />
                </div>
                <div className="input">
                <img src={emailicon} alt="email" />
                <input type="email" placeholder="Email" />
                </div>
                <div className="input">
                <img src={passicon} alt="passwd" />
                <input type="password" placeholder="Password" />
                </div>
                <div className="login">
                    <a href="">Already Have Account?</a>
                </div>
                <div className="submit-container">
                    <a href="" className="submit" type="submit">Signup</a>
                </div>
            </form>
    </div>
    </>);
}

export default Signup;