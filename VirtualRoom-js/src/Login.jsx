import React from "react";
import { useState } from 'react'
import './Login.css';
import user from "./assets/Images/person.png"
import emailicon from './assets/Images/email.png'
import passicon from './assets/Images/password.png'


function Login()
{
    const [action,setaction]=useState("Signup");
    const [data,setdata]=useState({
        name:" ",
        username:"",
        email:"",
        password:""
    });

    const handlesubmit=(event)=>{
          event.preventDefault();
          if(action==="Signup")
          {
            if(!data.email||!data.name||!data.username||!data.password)
            {
                alert("Please enter the credential");
            }
            else
            {
                alert("Registered");
            }
          }
    }

    return(<>
    <div className="container">        
        <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
        </div>
        <div className="inputs">
        {action==="Login"?<div></div>:
        <>
            <div className="input">              
                <img src={user} alt="" />
                <input type="text" name="" id="" placeholder="Name" required/>
              </div> 
              <div className="input">
                <img src={user} alt="" />
                <input type="text" name="" id="" placeholder="Username" required/>
              </div>       
        </>
        }
              <div className="input">
                <img src={emailicon} alt="" />
                <input type="email" name="" id="" placeholder="Email" required/>
              </div>
              <div className="input">
                <img src={passicon} alt="" />
                <input type="password" name="" id="" placeholder="Password" required/>
              
            </div>           
        </div>
        <div className="submit-container">
            <button className={action==="Login"?"submit gray":"submit"} onClick={()=>{
                setaction("Signup");
                if(action==="Signup")
                {
                    onclick=()=>{
                        if(data.email&&data.name&&data.username&&data.password===null)
                        {
                            alert("enter credntial");
                        }
                        
                    }
                }
            }}>Sign up</button>
            <button type="submit" formMethod="post" className={action==="Signup"?"submit gray":"submit"} onClick={()=>{
                setaction("Login");
                
            }}>Login</button>
        </div>
    </div>
    </>);
}

export default Login