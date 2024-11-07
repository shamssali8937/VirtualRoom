import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'
import axios from 'axios';
import "../Css/Login1.css";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri"
import { FaUser } from "react-icons/fa";


function Signup1()
{
    let [data,setData]=useState({
        email:"",
        password:"",
        name:"",
        username:""
    });

    const apiurl='https://localhost:7040/api/StudentPortal/Register';
    
    let navigate=useNavigate(); 

    let handlesubmit=(event)=>{
        event.preventDefault();
        if(data.email&&data.password&&data.name&&data.username)
        {
            const credentials={
                name:data.name,
                username:data.username,
                email:data.email,
                password:data.password
            }
           axios.post(apiurl,credentials).then((respone)=>{
            if(respone.data.statuscode==400)
            {
                alert(respone.data.statusmessage);
            }
            else
            {
                alert("Congragulation You Just Signed up Now Please Login");
                navigate("/login");
            }
            
           }).catch((error)=>{
            console.error("There was an error signing up!", error);
           })          
        }
    };
    const handlechange = (event) => {
        const { name, value } = event.target;
        setData(prevdata => ({
            ...prevdata,
            [name]: value
        }));
    };
    return (
        <>
        <div className="wraper">
            <form onSubmit={handlesubmit}>
                <h1 className='head'>Login</h1>
                <div className="input-box">
                    <input type="text" placeholder='Name' name="name" value={data.name} onChange={handlechange} required/>
                    <FaUser className='icon'/>
                    </div> 
                <div className="input-box">
                    <input type="text" placeholder='Username'  name="username" value={data.username} onChange={handlechange} required/>
                    <FaUser className='icon'/>
                    </div> 
                    <div className="input-box">
                    <input type="text" placeholder='Email' name="email" value={data.email} onChange={handlechange} required/>
                    <MdEmail className='icon'/>
                    </div> 
                    <div className="input-box">
                    <input type="password" placeholder='Password' name="password" value={data.password} onChange={handlechange} required/>
                    <RiLockPasswordFill className='icon'/>
                    </div> 
                    <div className="rember-forget">
                    <label htmlFor=""><input type="checkbox" />Show Password</label>
                    </div>
                    <button type='submit'>Login</button>

                    <div className="register-link">
                        <p>Already have an account? <Link to="/login1" id="link">Login?</Link> </p>
                    </div>
            </form>
        </div>
        </>
    )
}

export default Signup1;