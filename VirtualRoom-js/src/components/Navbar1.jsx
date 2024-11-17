import { useEffect, useState } from 'react';
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
    let [teacher,setteacher]=useState("");
    let [isteacher,setisteacher]=useState();

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
    if(!isteacher)
    {
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
                                            window.location.reload();    
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
                                    alert("no class found found");
                                }
                               })
                
                        }
                        else
                        {
                            console.log("no course found");
                            alert("no course found");
                        }
                  });
    
            }
            else
            {
                console.log("no student exist");
            }
            
          });
    }
    else
    {
        console.log(teacher);
        axios.post("https://localhost:7124/api/Virtual/Teacherid",{name:teacher}).then((response)=>{
            if(response.data.statuscode===200)
            {
                const tid=response.data.statusmessage;
                return axios.post("https://localhost:7124/api/Virtual/classid",{name:cl}).then((response)=>{
                    if(response.data.statuscode===200)
                    {
                        const cid=response.data.statusmessage;
                        let credentials={
                            classid:parseInt(cid),
                            teacherid:parseInt(tid)
                        }
                        return axios.post("https://localhost:7124/api/Virtual/teacherjoin",credentials).then((response)=>{
                             if(response.data.statuscode==200)                   
                             {
                                alert("class joined");
                                window.location.reload();
                             }
                             else
                             {
                                alert("Error in joining class");
                             }
                        })
                    }
                    else
                    {
                        alert("no class exist ");
                    }
                })
            }
            else
            {
                alert("no teacher exists");
            }
        });
    }
    
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
   useEffect(()=>{
    const token=localStorage.getItem('token');
    axios.defaults.headers.common['Authorization']=`Bearer ${token}`;    

    axios.get("https://localhost:7124/api/Virtual/Isteacher").then((response)=>{
        if(response.data.statuscode===200)
        {
            setisteacher(isteacher=response.data.statusmessage);
            console.log("isteacher",isteacher.toLowerCase());         
        }
        else
        {
            console.log("no teacher exist");
        }
    })
   
   },[ ]);

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
                    {
                        isteacher?(
                            <>
                           <input type="text" placeholder="Teacher Name" name="teacher" value={teacher=userdata.name} onChange={handlechange} readOnly/>
                            </>
                        ):(
                            <>
                             <input type="text" placeholder="Course Name" name="course" value={course} onChange={handlechange} required/>
                             <input type="text" placeholder="Student Name" name="student" value={student=userdata.name} onChange={handlechange} readOnly/>
                            
                            </>
                        )
                    }
                    
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
