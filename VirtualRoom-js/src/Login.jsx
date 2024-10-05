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

    const handlechange=(event)=>{
        const{name,value}=event.target;
        setdata({
            ...data,
            [name]:value
        })
    }
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
                clearfields(); 
            }
          }
          else
          {
            if(!data.email||!data.password)
            {
                alert("Please enter the credentials");
            }
            else
            {
                alert("LogedIn");
                clearfields(); 
            }
          }
    }

    const clearfields = () => {
        setdata({
            name: "",
            username: "",
            email: "",
            password: ""
        });
    };

    return(<>
    <div className="container">        
        <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
        </div>
        <form className="inputs" onSubmit={handlesubmit}>
        {action==="Login"?<div></div>:
        <>
            <div className="input">              
                <img src={user} alt="" />
                <input type="text" name="name" id="" placeholder="Name" value={data.name} onChange={handlechange} required/>
              </div> 
              <div className="input">
                <img src={user} alt="" />
                <input type="text" name="username" id="" placeholder="Username" value={data.username} onChange={handlechange} required/>
              </div>       
        </>
        }
              <div className="input">
                <img src={emailicon} alt="" />
                <input type="email" name="email" id="" placeholder="Email" value={data.email} onChange={handlechange} required/>
              </div>
              <div className="input">
                <img src={passicon} alt="" />
                <input type="password" name="password" id="" placeholder="Password" value={data.password} onChange={handlechange} required/>
              
            </div>                   
        <div className="submit-container">
            <button className={action==="Login"?"submit gray":"submit"} onClick={()=>{
                setaction("Signup");
                // if(action==="Signup")
                // {
                //     onclick=()=>{
                //         if(data.email&&data.name&&data.username&&data.password===null)
                //         {
                //             alert("enter credntial");
                //         }
                        
                //     }
                // }
            }}>Sign up</button>
            <button type="submit"  className={action==="Signup"?"submit gray":"submit"} onClick={()=>{
                setaction("Login");
                
            }}>Login</button>
        </div>
    </form>
    </div>
    </>);
}

export default Login