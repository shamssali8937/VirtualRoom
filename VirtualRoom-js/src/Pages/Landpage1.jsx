import { useEffect, useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
import { IoSettingsOutline } from "react-icons/io5";
import axios from "axios";
import { jwtDecode } from 'jwt-decode'
import Navbar1 from "../components/Navbar1";
import { LuHome } from "react-icons/lu";
import { PiStudentBold } from "react-icons/pi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaTasks, FaFolder } from "react-icons/fa";
import { TbArrowBackUp } from "react-icons/tb";
import "../Css/Landpage1.css";
  

function Landpage1(){


    let [classes, setClasses] = useState([]);
    let [isteacher,setisteacher]=useState();
    let [selectedclass, setselectedclass] = useState(null);
    let [click,setclick]=useState(true);
    let [view,setview]=useState(false);
    let [submissionview,setsubmissionview]=useState(false);
    let [sid,setsid]=useState();
    let [aobject,setaobject]=useState({
        courseid:0,
        classid:0,
        aname:"",
        date:"",
        due:"",
        time:"",
        description:""
    });
    let [submission,setsubmission]=useState({
        submissionid:0,
        grades:"",
        comments:""
    })

    

    const clear=()=>{
        setaobject({
        courseid:0,
        classid:0,
        aname:"",
        date:"",
        due:"",
        time:"",
        description:""
        })
    }
    const [assignments, setassignments] = useState([
        { id: 1, studentName: 'John Doe', title: 'Math Homework', submitted: true },
        { id: 2, studentName: 'Jane Smith', title: 'Science Project', submitted: true },
        { id: 3, studentName: 'Emily Brown', title: 'History Essay', submitted: false },
      ]);

      const handlegrade=(e)=>{
        e.preventDefault();
        console.log(submission);
        // axios.post("https://localhost:7124/api/Virtual/Grade",submission).then((response)=>{
        //     if(response.data.statuscode===200)
        //     {
        //         alert("Graded");
        //     }
        //     else
        //     {
        //         alert("error in grading");
        //     }
        // })
    }

    const handlesubmissionlist=(assignment)=>{
               setaobject({aname:assignment.title});
               setsubmission({
                ...submission,
                submissionid:assignment.id
               })
               setsubmissionview(!submissionview);
    }

    const handlechange = (event) => {
        const { name, value } = event.target;
        setaobject(prevdata => ({
            ...prevdata,
            [name]: value
        }));
    };
    
    const changeofinput = (event) => {
        const { name, value } = event.target;
        setsubmission(prevdata => ({
            ...prevdata,
            [name]: value
        }));
    };

    const Addassignment=(e)=>{
          e.preventDefault();
          axios.post("https://localhost:7124/api/Virtual/Getcourse",{classid:aobject.classid}).then((response)=>{
            if(response.data.statuscode===200)
            {
                let cid=parseInt(response.data.statusmessage);
                let updatedobject = {
                    ...aobject,
                    time:aobject.time + ':00',
                    courseid: cid
                };
                console.log(cid);
                console.log(updatedobject);
                return axios.post("https://localhost:7124/api/Virtual/Addassignment",updatedobject).then((response)=>{
                    if(response.data.statuscode===200)
                    {
                        alert("Assigned...");
                        clear();
                    }
                    else
                    {
                        alert("error in assigning");
                    }
                })
            }
            else
            {
                alert("class does not exist");
            }
          });
    }
      
    const handleview=()=>{
        setview(!view);
    }

    const handleclick=()=>{
        setclick(!click);
    }

    let [open,setopen]=useState(false);

    let handleopen=(classname,clid)=>{
        setselectedclass(classname);
        setaobject(prevdata => ({
            ...prevdata,
            classid: clid,
        }));
        setopen(!open);
        console.log(open);
    }

   let [data,setData]=useState({
    name:"",
    username:"",
    email:""
});
    let navigate=useNavigate();
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
            console.log("Not authourized");
            navigate('/login1');  
         }
         else{
            
            if(tokenexpiry(token))
            {
                localStorage.removeItem('token');     
                navigate('/login1');
                alert("please login again");
                return;
            }
            axios.defaults.headers.common['Authorization']=`Bearer ${token}`;    
            axios.get("https://localhost:7124/api/Virtual/Getuser").then((response)=>{
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
                    localStorage.removeItem('token');
                }
            })
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
         });
         
        }
       
    
},[navigate]);

     useEffect(()=>{
        if(!isteacher)
            {
               axios.get("https://localhost:7124/api/Virtual/Classlit").then((response)=>{
                   if(response.data.statuscode===200)
                   {
                       setClasses(response.data.classes);
                   }
                   else
                   {
                       console.log(response.data.statuscode);
                   }
               });
               
            }
            else
            {
               axios.get("https://localhost:7124/api/Virtual/Teacherclasses").then((response)=>{
                   if(response.data.statuscode===200)
                   {
                       setClasses(response.data.classes);
                   }
                   else
                   {
                       console.log(response.data.statuscode);
                   }
            });
            }
     },[isteacher])

    
   
    return(
        <>
        <Navbar1 userdata={data}/>
        <div className="sidebar">
            <nav>
                <ul>
                <li><a href=""><LuHome className="side-icons"/>Home</a></li>
                </ul>
                <div className="underline">
                </div>
                <div className="section">
                    <ul>
                        <li><a className="btn"  onClick={(e)=>{ e.preventDefault(); handleclick();}}><PiStudentBold className="side-icons"/>
                        {isteacher?"Teaching":"Enrolled"}</a>
                        {
                            click&&(
                                
                                    <ul>
                                    {
                                          classes.map((item)=>{
                                              return(
                                               <li className="list" key={item.classid} onClick={()=>handleopen(item.classname,item.classid)} >{item.classname}</li>   
                                              )
                                          })
                                      }
                                  </ul>   
                        )}
                        
                        </li>

                    </ul>
                    {
                        !isteacher&&(
                            <ul>
                            <li><a href=""><IoDocumentTextOutline className="side-icons"/>To Do</a></li>
                            </ul>
                        )     
                    }
                   
                </div>
                <div className="underline">
                </div>
                <ul id="setting">
                <li><a href="#"><IoSettingsOutline className="side-icons"/> Settings</a></li>
                </ul>
            </nav>
        </div>
        
        <div className="main-content">
     {
               classes.map((item)=>{
                return(
                <div className="class-box" key={item.classid} >
                <div className="class-header"  onClick={()=>handleopen(item.classname,item.classid)} >
                    <h3>{item.classname}</h3>
                    <p>{item.classname}</p>
                </div>
                <div className="class-body">
    
                </div>
                <div className="class-footer">
                <FaTasks className="footer-icon" title="Assignments" />
                <FaFolder className="footer-icon" title="Materials" />
                </div>
              </div>
                );
               })
     }
           <div className={`classdetail ${open?"visible":""}`}>
            <div className="header">
            <TbArrowBackUp className="back"  onClick={()=>setopen(!open)}/><h3>{selectedclass}</h3>
            </div>
            <div className="detailbody">
                {
                    isteacher?(
                        <div className="assignment-container">
                            <div className="assignment-head">
                              <h2>Assignment</h2> 
                              <button onClick={handleview} className="submission">{view?"Back to Create":"View Submissions"}</button>
                            </div>
                            {
                                !view?(
                                    <>
                                    
                                    <form onSubmit={Addassignment}>
                                    <div className="assignment">
                                        <input type="text" name="classid" value={aobject.classid} onChange={handlechange} readOnly/>
                                        <input type="text" placeholder="Title" className="title-input" name="aname" value={aobject.aname} onChange={handlechange} required/>
                                        <textarea placeholder="Description" className="des-input" name="description" value={aobject.description} onChange={handlechange}></textarea>
                                    </div>
                                    <div className="assignment-detail">
                                       <label>Date: <input type="date" name="date" value={aobject.date} onChange={handlechange} required/></label>
                                       <label>Due : <input type="date" name="due" value={aobject.due} onChange={handlechange} required /></label>
                                       <label>Time: <input type="time" name="time" value={aobject.time} onChange={handlechange} required/></label>
                                    </div>
                                    <button className="assign-btn" type="submit">Assign</button>
                                    </form>
                                    </>
                                ):(
                                   <>
                                   <div className="submission-container">
                                    <div className="submit-header">
                                    <h3>Submissions</h3>
                                    </div>
                                    <div className="submit-content">
                                        <div className="submit-list">
                                            {
                                                assignments.map((item)=>{
                                                    return(
                                                        <div className="submit-item" key={item.id} >
                                                        <span className="submit-student">{item.studentName}</span>
                                                        <span className="submit-title">{item.title}</span>
                                                        <span className="submit-status">{item.submitted?"Submitted":"Not Submitted"}</span>
                                                        <button className="submit-btn grade" onClick={()=>handlesubmissionlist(item)}>Grade</button>
                                                    </div>
                                                    )
                                                    
                                                })
                                            }
                                        </div>
                                        <form onSubmit={handlegrade} className={`grade-container ${submissionview?"opacity1":"opacity0"}`}>
                                            <h4>Grade</h4>
                                            <label>{aobject.aname}</label>
                                            <input type="hidden" name="submissionid" value={submission.submissionid} onChange={changeofinput} readOnly/>
                                            <input type="number" placeholder="Grades" name="grades" value={submission.grades} onChange={changeofinput} required/>
                                            <input type="text" placeholder="Comments" name="comments" value={submission.comments} onChange={changeofinput} required/>
                                            <button className="grade-btn" onClick={(e)=>{e.preventDefault(); setsubmissionview(!submissionview)}}>Cancel</button>
                                            <button className="grade-btn" type="submit">Grade</button>
                                        </form>
                                    </div>
                                   </div>
                                   </> 
                                )
                            }
                        </div>   
                    ):(
                      <div className="assignment-list">
                        <div className="item">
                            <p>Fundamentals of OOP</p>
                            <button className="submit">Submit</button>
                        </div>
                      </div>
                    )
                }
            </div>
           </div>
        
        </div>
        </>
         
    )   
}

export default Landpage1;