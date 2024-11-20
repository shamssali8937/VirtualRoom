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
    let [click,setclick]=useState(false);
    let [view,setview]=useState(false);
    const [assignments, setassignments] = useState([
        { id: 1, studentName: 'John Doe', title: 'Math Homework', submitted: true },
        { id: 2, studentName: 'Jane Smith', title: 'Science Project', submitted: true },
        { id: 3, studentName: 'Emily Brown', title: 'History Essay', submitted: false },
      ]);

      
    const handleview=()=>{
        setview(!view);
    }

    const handleclick=()=>{
        setclick(!click);
    }

    let [open,setopen]=useState(false);

    let handleopen=(classname)=>{
        setselectedclass(classname);
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
                                               <li className="list" key={item.classid} onClick={()=>handleopen(item.classname)} >{item.classname}</li>   
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
                <div className="class-header"  onClick={()=>handleopen(item.classname)} >
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
                                    <div className="assignment">
                                        <input type="text" placeholder="Title" className="title-input" />
                                        <textarea placeholder="Description" className="des-input"></textarea>
                                    </div>
                                    <div className="assignment-detail">
                                       <label>Date: <input type="date" name="date" id="" /></label>
                                       <label>Due : <input type="date" name="duedate" id="" /></label>
                                       <label>Time: <input type="time" name="time" id="" /></label>
                                    </div>
                                    <button className="assign-btn">Assign</button>
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
                                                        <div className="submit-item">
                                                        <span className="submit-student"><strong>{item.studentName}</strong></span>
                                                        <span className="submit-title"><strong>{item.title}</strong></span>
                                                        <span className="submit-status">{item.submitted?"Submitted":"Not Submitted"}</span>
                                                        <button className="submit-btn grade">Grade</button>
                                                    </div>
                                                    )
                                                    
                                                })
                                            }
                                        </div>
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