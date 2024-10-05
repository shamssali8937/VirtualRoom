import React from "react";
import { useState } from 'react'
import './Login.css';
import user from "./assets/Images/person.png"
import emailicon from './assets/Images/email.png'
import passicon from './assets/Images/password.png'


function Login()
{
    const [action,setaction]=useState("Signup");
    return(<>
    <div className="container">
        <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
        </div>
        <div className="inputs">
        {action==="Login"?<div></div>:
            <div className="input">              
                <img src={user} alt="" />
                <input type="text" name="" id="" placeholder="Name" />
              </div> 
        }
              <div className="input">
                <img src={user} alt="" />
                <input type="text" name="" id="" placeholder="Username"/>
              </div>
              <div className="input">
                <img src={emailicon} alt="" />
                <input type="email" name="" id="" placeholder="Email"/>
              </div>
              <div className="input">
                <img src={passicon} alt="" />
                <input type="password" name="" id="" placeholder="Password"/>
              
            </div>
        </div>
        <div className="submit-container">
            <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{
                setaction("Signup");
            }}>Sign up</div>
            <div className={action==="Signup"?"submit gray":"submit"} onClick={()=>{
                setaction("Login");
            }}>Login</div>
        </div>
    </div>
    </>);
}

export default Login