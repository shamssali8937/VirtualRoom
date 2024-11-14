import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Css/Navbar.css';
import { SiGoogleclassroom } from "react-icons/si";
import { FaRegCircleUser } from "react-icons/fa6";
function Navbar1({userdata})
{
       let [click1,setclick1]=useState(false);
       let handleclick1=()=>{
           setclick1(!click1);
           setclick2(false);
           setclick3(false);
      };
      let [click2,setclick2]=useState(false);
      let handleclick2=()=>{
          setclick2(!click2);
          setclick1(false);
          setclick3(false);
          
     };
     let [click3,setclick3]=useState(false);
     let handleclick3=()=>{
         setclick3(!click3);
         setclick1(false);
         setclick2(false);
    };
    let handlesignout=()=>{
    localStorage.removeItem('token');
   }

    return(
        <>
        <div className="navbar">
            <div className="left">
            <SiGoogleclassroom className='icon-main'/><h1>VirtualRoom</h1>
            </div>
            <div className="right">
                <button className="nav-btn" onClick={handleclick2}>Join Class</button>
                <button className="nav-btn" onClick={handleclick3}>Create Class</button>
                <FaRegCircleUser className='icons' onClick={handleclick1}/>
            </div>
        </div>
        <div className={`user ${click1?'opacity1':'opacity0'}`}>
            <label>{userdata.email}</label>
            <FaRegCircleUser className='icons profile'/>
            <label>{userdata.name}</label>
            <div className="signout">
            <Link to="/login1" id="link" onClick={handlesignout}>Sign Out</Link> 
            </div>
        </div>
        <form className={`joinclass ${click2?'opacity1':'opacity0'}`}>
                <h3>Join Class</h3>
                <div className="class">
                    <h4>Class Name</h4>
                    <p>Ask your teacher for the class name, then enter it here.</p>
                    <input type="text" name="class"  required />
                </div>
                <div className="instruction">
                <p>To sign in with a class Name</p>
                <ul>
                    <li>Use an authorised account</li>
                    <li>Use a class name with 5-7 letters or numbers, and no spaces or symbols</li>
                </ul>
                </div>
                <div className="button">
                   <button onClick={() => setclick2(false)}>Cancel</button>
                   <button type="submit">Join</button>
                </div>
            </form>
            <form className={`createclass ${click3?'opacity1':'opacity0'}`}>
                <h3>Create Class</h3>
                <div className="create">
                    <input type="text" placeholder='Class Name' name="name" required/>
                    <input type="text" placeholder='Course Name' name="course" required />
                </div>
                <div className="createbtn">
                   <button onClick={() => setclick3(false)}>Cancel</button>
                   <button type="submit">create</button>
                </div>
            </form>
        
        </>
    )
}

export default Navbar1;
