import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Css/Navbar.css';
import { SiGoogleclassroom } from "react-icons/si";
import { FaRegCircleUser } from "react-icons/fa6";
import axios from 'axios';
function Navbar1({userdata})
{
    let [cl,setcl]=useState("");
    let [course,setcourse]=useState("");
    let [student,setstudent]=useState("");

    let [create,setcreate]=useState({
        courseid:"",
        classname:"",
        desc:""
    })

    let clear=()=>{
        if(click3===true)
        {
            setcreate({
                courseid:"",
                classname:"",
                desc:""
                })
        }
        else
        {
            setcl("");
            setcourse("");
            setstudent("");
        }
        
    }
    

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
          clear();
     };
     let [click3,setclick3]=useState(false);
     let handleclick3=()=>{
         setclick3(!click3);
         setclick1(false);
         setclick2(false);
         clear();
    };
    let handlesignout=()=>{
    localStorage.removeItem('token');
   }

   const handlechange=(e)=>{
    const {name,value}=e.target;
    if(name==="class")
    {
        setcl(value);
    }
    else if(name==="course")
    {
        setcourse(value);
    }
    else
    {
        setstudent(value);
    }
   }

   const handlenrollment=(e)=>{
    e.preventDefault()
    console.log(student);
    axios.post("https://localhost:7124/api/Virtual/studentid",{name:student}).then((response)=>{
        if(response.data.statuscode===200)
        {
            const stid=response.data.statusmessage;    
            console.log(stid);
            console.log(course);
            return axios.post("https://localhost:7124/api/Virtual/courseid",{name:course}).then((response)=>{
                if(response.data.statuscode===200)
                    {
                        const cid=response.data.statusmessage;
                        console.log(cid);
                        console.log(cl);
                        return axios.post("https://localhost:7124/api/Virtual/classid",{name:cl}).then((response)=>{
                            if(response.data.statuscode==200)
                            {
                                const clid=response.data.statusmessage;
                                
                                      const enrollment={
                                          courseid:parseInt(cid),
                                          classid: parseInt(clid),
                                          studentid:parseInt(stid)
                                      };
                                    
                                console.log(enrollment);
                                return axios.post("https://localhost:7124/api/Virtual/join",enrollment).then((response)=>{
                                    if(response.data.statuscode===200)
                                    {
                                        alert("joined");
                                        setclick2(false);
                                    }
                                    else
                                    {
                                        console.log(response.data.statuscode);
                                        alert("error in enrolling" ,response.data.statusmessage);
                                    }
                                });
                            }
                            else
                            {
                                console.log("no class found found");        
                            }
                           })
            
                    }
                    else
                    {
                        console.log("no course found");
                    }
              });

        }
        else
        {
            console.log("no student exist");
        }
        
      });
};
const handlecreate=(e)=>{
    e.preventDefault();
    return axios.post("https://localhost:7124/api/Virtual/courseid",{name:create.courseid}).then((response)=>{
        if(response.data.statuscode===200){
            const cid=response.data.statusmessage;
            const classes={
                courseid:parseInt(cid),
                classname:create.classname,
                description:create.desc
            }

            return axios.post("https://localhost:7124/api/Virtual/Addclass",classes).then((response)=>{
                if(response.data.statuscode===200)
                {
                    alert("class created");
                    clear();
                    setclick3(false);
                    setclick2(true);
                }
                else
                {
                    alert("error occur");
                }
            });
        }
        else
        {
            alert("course not found");
        }
    });
  }
const handlecreatechange = (event) => {
    const { name, value } = event.target;
    setcreate(prevdata => ({
        ...prevdata,
        [name]: value
    }));
};
   

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
        <form onSubmit={handlenrollment} className={`joinclass ${click2?'opacity1':'opacity0'}`}>
                <h3>Join Class</h3>
                <div className="class">
                    <h4>Class Name</h4>
                    <p>Ask your teacher for the class name, then enter it here.</p>
                    <input type="text" placeholder="Class Name" name="class" value={cl} onChange={handlechange} required/>
                    <input type="text" placeholder="Course Name" name="course" value={course} onChange={handlechange} required/>
                    <input type="text" placeholder="Student Name" name="student" value={student} onChange={handlechange} required/>
                </div>
                <div className="instruction">
                <p>To sign in with a class Name</p>
                <ul>
                    <li>Use an authorised account</li>
                    <li>Use a class name with 5-7 letters or numbers, and no spaces or symbols</li>
                </ul>
                </div>
                <div className="button">
                   <button type="button" onClick={() => setclick2(false)}>Cancel</button>
                   <button type="submit">Join</button>
                </div>
            </form>
            <form onSubmit={handlecreate} className={`createclass ${click3?'opacity1':'opacity0'}`}>
                <h3>Create Class</h3>
                <div className="create">
                    <input type="text" placeholder='Class Name' name="classname" value={create.classname} onChange={handlecreatechange} required/>
                    <input type="text" placeholder='Course Name' name="courseid" value={create.courseid} onChange={handlecreatechange} required />
                    <input type="text" placeholder='Description' name="desc" value={create.desc} onChange={handlecreatechange} required />
                </div>
                <div className="createbtn">
                   <button type="button" onClick={() => setclick3(false)}>Cancel</button>
                   <button type="submit">create</button>
                </div>
            </form>
        
        </>
    )
}

export default Navbar1;
