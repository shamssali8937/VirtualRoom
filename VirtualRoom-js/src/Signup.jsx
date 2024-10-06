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
                <input type="text" placeholder="Name" required/>
                </div>
                <div className="input">
                <img src={user} alt="user" />
                <input type="text" placeholder="Username" required/>
                </div>
                <div className="input">
                <img src={emailicon} alt="email" />
                <input type="email" placeholder="Email" required/>
                </div>
                <div className="input">
                <img src={passicon} alt="passwd" />
                <input type="password" placeholder="Password" required/>
                </div>
                <div className="login">
                    <a href="https://www.w3schools.com/react/react_forms.asp" target="blank">Already Have Account?</a>
                </div>
                <div className="submit-container">
                    <a href="" className="submit" type="submit">Signup</a>
                </div>
            </form>
    </div>
    </>);
}

export default Signup;