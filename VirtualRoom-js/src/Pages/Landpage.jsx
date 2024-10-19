import { useEffect, useState} from "react";
import { useNavigate} from 'react-router-dom';
import '../Css/Landpage.css'
import usericon from '../assets/Images/person.png'
import Navbar from "../components/Navbar";
import axios from "axios";
import { jwtDecode } from 'jwt-decode'

function Landpage()
{
    let [click,setclick]=useState(true);

    let [data,setData]=useState({
        name:"",
        username:"",
        email:""
    });

    let navigate=useNavigate();

    let handleclickaccount=()=>{
         setclick(true);
    };
    let handleclickpasswd=()=>{
        setclick(false);
   };

   const tokenexpiry=(token)=>{
    if(!token)
    {
        return true;
    }
    let decodetoken=jwtDecode(token);
    if(!decodetoken||!decodetoken.exp)
      {
        console.log("error in decoding token");
        return true;
      }
    else{
      
        let time=Date.now()/1000;
        return decodetoken.exp<time;
    }
   };

   useEffect(()=>{
     const token=localStorage.getItem('token');
     if(!token){
        console.log("please login first");
        navigate('/login');
     }
     else{
        axios.defaults.headers.common['Authorization']=`Bearer ${token}`;   
        if(tokenexpiry(token))
        {
            localStorage.removeItem('token');     
            navigate('/login');
            alert("please login again");
            return;
        }

        axios.get("https://localhost:7040/api/StudentPortal/Student").then((response)=>{
            if(response.data.statuscode==200)
            {
                const user=response.data.user;
                setData({
                    name:user.name,
                    username:user.username,
                    email:user.email
                });
            }
            else
            {
                alert("please login with correct credentials");                
            }
        })
     }

   },[navigate]);

    return(
    <>
   
     {/* <nav className="navbar"> 
        <div className="navdiv">
            <div className="logo"><a href="">Virtual Room</a></div>
            <ul>
                <li><a href="#con-body">Home</a></li>
                <li><a href="">About Us</a></li>
                <li><a href="">Contact Us</a></li>
            </ul>
        </div>
    </nav>  */}
    <Navbar/>
    {/* <h1>User Account</h1> */}
    <div className="body-container" id="con-body">
    
        <div className="side-bar">
            <div className="image">
                    <img src={usericon} alt="user" />                    
            </div>
            <div className="name">
            <b>{data.username}</b>
            </div>
            <div className="account-information" onClick={handleclickaccount}>
                Account
            </div>
            <div className="account-information" onClick={handleclickpasswd}>
                Password
            </div>
        </div>
        <div className="main-content red-background">
            {
                click?(
              <div className="data display">
                <label htmlFor="Name">Name</label><input id="Name" type="text" value={data.name} name="name" readOnly />
                <label htmlFor="Username">Username</label><input id="Username" type="text" value={data.username} name="username" readOnly />
                <label htmlFor="Email">Email</label><input id="Email" type="email" value={data.email} name="email" readOnly />
              </div>

                ):(
              <div className="password opacity">
              <label htmlFor="Password">Password</label><input id="Password" type="text" value={data.email} name="password" readOnly />
              </div>
                )}
        </div>
    </div>


    </>);
}

export default Landpage;