import { useEffect, useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
import { IoSettingsOutline } from "react-icons/io5";
import axios from "axios";
import { jwtDecode } from 'jwt-decode'
import Navbar1 from "../components/Navbar1";
import { LuHome } from "react-icons/lu";
import { PiStudentBold } from "react-icons/pi";
import { FaTasks, FaFolder } from "react-icons/fa";
import { TbArrowBackUp } from "react-icons/tb";
import "../Css/Landpage1.css";
  

function Landpage1(){


    let [classes, setClasses] = useState([]);
    let [isteacher,setisteacher]=useState();
    let [selectedclass, setselectedclass] = useState(null);
    let [click,setclick]=useState(true);
    let [click1,setclick1]=useState(false);
    let [view,setview]=useState(false);
    let [submissionview,setsubmissionview]=useState(false);
    let [viewassignments,setviewassignments]=useState(false);
    let [viewlist,setviewlist]=useState({});
    let [checkgrade,setcheckgrade]=useState([]);
    let [issubmitted, setissubmitted] = useState(false);
    let [submissionlist,setsubmissionlist]=useState([]);
    let [uploadassignment,setuploadassignment]=useState({
        aid:0,
        student:"",
        description:"",
        file:""
    });
    let [aobject,setaobject]=useState({
        courseid:0,
        classid:0,
        aname:"",
        dated:"",
        duedate:"",
        time:"",
        description:"",
        file:""

    });
    let [submission,setsubmission]=useState({
        sid:"",
        grades:"",
        comments:""
    })
    const clear=()=>{
        setaobject({
        courseid:0,
        classid:0,
        aname:"",
        dated:"",
        duedate:"",
        time:"",
        description:"",
        file:""
        });
    }

    const switchviewlist = (aid) => {
        console.log("viewlist1",viewlist);
        setviewlist((prev) => ({
          ...prev,
          [aid]: !prev[aid],
        }));
        console.log("viewlist2",viewlist);
        setsubmissionlist([]); 
       axios.post("https://localhost:7124/api/Virtual/SubmissionList",{id:aid}).then((response)=>{
        if(response.data.statuscode===200)
        {
            console.log(response.data.submission);
            setsubmissionlist(submissionlist=response.data.submission);
            console.log("submissionlist",submissionlist);
        }
        else
        {
            alert("no submission for the assignment");
            setsubmissionlist([]);
            console.log("submissionlist",submissionlist);
        }
       });
      };

    const [assignments, setassignments] = useState([]);

      const handlegrade=(e)=>{
        e.preventDefault();
        console.log(submission);
        axios.post("https://localhost:7124/api/Virtual/Grade",submission).then((response)=>{
            if(response.data.statuscode===200)
            {
                alert("Graded");
            }
            else
            {
                alert("error in grading");
            }
        });
    }

    const handlesubmissionlist=(assignment)=>{
               setaobject({aname:assignment.aname});
               setsubmission({
                grades: "",
                comments: "",
                sid:assignment.submissionid
               })
               console.log("sid",assignment.submissionid);
               setsubmissionview(!submissionview);
    }

    const changeofsubmission = (event) => {
        const { name, value, files } = event.target;
        if(name==="file")
        {
            setuploadassignment(prevdata => ({
            ...prevdata,
            file: files[0], 
        }));
        }
        else
        {
            setuploadassignment(prevdata => ({
                ...prevdata,
                [name]: value
            }));
        }
    };

    const handlechange = (event) => {
        const { name, value, files } = event.target;
        if (name === "file") 
        {
            setaobject(prevdata => ({
                ...prevdata,
                file: files[0], 
            }));
        } 
        else 
        {
            setaobject(prevdata => ({
                ...prevdata,
                [name]: value,
            }));
        }
    };
    
    const changeofinput = (event) => {
        const { name, value } = event.target;
        setsubmission(prevdata => ({
            ...prevdata,
            [name]: value
        }));
    };
    
    const submitassignment=(e)=>{
        e.preventDefault();

        let formdata = new FormData();
        formdata.append('description', uploadassignment.description);
        formdata.append('file', uploadassignment.file);

        axios.post("https://localhost:7124/api/Virtual/studentid",{name:uploadassignment.student}).then((response)=>{
            if(response.data.statuscode===200)
            {
                     let sid=response.data.statusmessage;
                    //  let credentials={
                    //     aid:aobject.aid,
                    //     studentid:sid,
                    //     description:uploadassignment.description,
                    //     file:uploadassignment.file,
                    //     issubmit:true
                    //  }
                    formdata.append('aid',aobject.aid);
                    formdata.append('studentid', sid);
                    formdata.append('issubmit', true);
                     console.log(formdata);
                     return axios.post("https://localhost:7124/api/Virtual/submit",formdata).then((response)=>{
                        if(response.data.statuscode===200)
                        {
                            alert("Submitted");
                            setclick1(!click1);
                        }
                        else if(response.data.statuscode===100)
                        {
                            alert("already Submited");
                            setclick1(!click1);
                        }
                        else
                        {
                            alert("Data Is Not Submitted");
                        }
                     });
            }
            else
            {
                alert("student not exist");
            }
        })
    }

    const Addassignment=(e)=>{
          e.preventDefault();

          let formdata = new FormData();
          formdata.append('classid', aobject.classid);
          formdata.append('aname', aobject.aname);
          formdata.append('description', aobject.description);
          formdata.append('dated', aobject.dated);
          formdata.append('duedate', aobject.duedate);
          formdata.append('time', aobject.time);

          if(aobject.file)
            {
            formdata.append('file', aobject.file);
          }
          else
          {
            alert("please Upload file");
          }
          


          axios.post("https://localhost:7124/api/Virtual/Getcourse",{classid:aobject.classid}).then((response)=>{
            if(response.data.statuscode===200)
            {
                let cid=parseInt(response.data.statusmessage);
                // let updatedobject = {
                //     ...aobject,
                //     time:aobject.time + ':00',
                //     courseid: cid,
                //     file:aobject.file
                // };
                formdata.append('courseid', cid);
                console.log(cid);
                console.log(formdata);
                return axios.post("https://localhost:7124/api/Virtual/Addassignment",formdata,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((response)=>{
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
        setviewassignments(!viewassignments);
    }  

    const checkissubmited=(id)=>{
        console.log("aid",id);        
        axios.post("https://localhost:7124/api/Virtual/issubmited",{name:`${id}`}).then((response)=>{
            if(response.data.statuscode===200)
            {
                console.log("response",response.data.statusmessage.toLowerCase())
                if(response.data.statusmessage.toLowerCase()=="true")
                {
                    setissubmitted(true);
                    console.log("issubmitted",issubmitted);
                }
                else
                {
                    setissubmitted(false);
                    console.log("issubmitted",issubmitted);
                }
                
            }
            else
            {
                console.log("error in checking submission");
            }
        })

    }    

    const handleviewstudent=(clname)=>{
        setview(!view);
        setviewassignments(!viewassignments);
        if(viewassignments===false){
            console.log("class",clname);
            const token=localStorage.getItem('token');
            axios.defaults.headers.common['Authorization']=`Bearer ${token}`;    
            axios.post("https://localhost:7124/api/Virtual/checkgrades",{name:clname}).then((response)=>{
                if(response.data.statuscode===200)
                {
                    setcheckgrade(response.data.grades);
                    console.log("check",checkgrade);
                }
                else
                {
                    alert("No Assignment is graded yet");
                    console.log("No Assignment is graded yet");
                }
            });
        }
        
    }
    const handleclick1=(assignment)=>{
        setaobject(assignment);
        console.log(assignment);
        setclick1(!click1);
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
        console.log(classname);
        axios.post("https://localhost:7124/api/Virtual/GetAssignment",{name:classname}).then((response)=>{
            if(response.data.statuscode===200)
            {
                const list=response.data.assignment;
                setassignments(list);
                console.log(assignments);
            }
            else
            {
                console.log("error in fecting assignment");
            }
        });


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
                       console.log(classes);
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
                       console.log(classes);
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
                                               <li className="list" key={item.classid} onClick={()=>handleopen(item.classname,item.classid)}>{item.classname}</li>   
                                              )
                                          })
                                      }
                                  </ul>   
                        )}
                        
                        </li>

                    </ul>
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
                <FaTasks className="footer-icon" title="Assignments" onClick={()=>handleopen(item.classname,item.classid)} />
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
                                        <input type="file" name="file" onChange={handlechange}  />
                                    </div>
                                    <div className="assignment-detail">
                                       <label htmlFor="date">Date: <input id="date" type="date" name="dated" value={aobject.dated} onChange={handlechange} required/></label>
                                       <label htmlFor="due">Due : <input id="due" type="date" name="duedate" value={aobject.duedate} onChange={handlechange} required /></label>
                                       <label htmlFor="time">Time: <input id="time" type="time" name="time" value={aobject.time} onChange={handlechange} required/></label>
                                    </div>
                                    <button className="assign-btn" type="submit">Assign</button>
                                    </form>
                                    </>
                                ):(
                                   <>
                                   <div className="asubmission-container">
                                    <div className="asubmit-header">
                                    <h3>Submissions</h3>
                                    </div>
                                    <div className="asubmit-content">
                                        <ul className="asubmit-list">
                                            {
                                                assignments.map((item)=>{
                                                    return(
                                                        <li className="asubmit-item" key={item.aid} >
                                                        <span className="item-content">{item.aname}</span>
                                                        <span className="item-content">{item.description}</span>
                                                        <button className="item-content submit-btn grade" onClick={()=>{switchviewlist(item.aid)}} title={item.aid}>view</button>
                                                        {viewlist[item.aid]&& (
                                                            <ul className="asub-list">
                                                                {
                                                                    submissionlist.map((item)=>{
                                                                         return(
                                                                            <li className="asub-item" key={item.submissionid}>
                                                                            <p className="asub-title">{item.student}</p>
                                                                            <p className="asub-title">{item.description}</p>
                                                                            {/* <p className="asub-title">{item.file}</p>         */}
                                                                            {item.file && (
                                                                               <a href={item.file} target="_blank" rel="noopener noreferrer" className="submit-file-link">
                                                                               File
                                                                               </a>
                                                                             )}
                                                                            <button className="asub-title submit-btn grade" onClick={() => handlesubmissionlist(item)}>Grade</button>
                                                                            </li>
                                                                         );
                                                                    })
                                                                }
                                                               
                                                            </ul>
                                                        )}
                                                        </li>
                                                    )
                                                    
                                                })
                                            }
                                        </ul>
                                        <form onSubmit={handlegrade} className={`grade-container ${submissionview?"opacity1":"opacity0"}`}>
                                            <h4>Grade</h4>
                                            <label>{aobject.aname}</label>
                                            <input type="hidden" name="submissionid" value={submission.sid} onChange={changeofinput} readOnly/>
                                            <input type="text" placeholder="Grades" name="grades" value={submission.grades} onChange={changeofinput} required/>
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
                        <div className="submission-container">
                         {/* <h3>{isteacher}</h3>    */}
                        <div className="submit-header">
                        <h3>Assignments</h3>
                        <button onClick={()=>handleviewstudent(selectedclass)} className="submission">{viewassignments?"Back to Assignments":"View Grades"}</button>
                        </div>
                        {
                            !viewassignments?(
                            <div className="submit-content">
                            <div className="submit-list">
                                {
                                    assignments.map((item)=>{   
                                        return(
                                            <div className="submit-item" key={item.aid}>
                                            <span className="submit-title">{item.aname}</span>
                                            <span className="submit-title">{item.description}</span>
                                            <button className="submit-btn grade" onClick={()=>handleclick1(item)}>Submit</button>
                                            </div>
                                        )
                                        
                                    })
                                }
                            </div>
                            <form onSubmit={submitassignment} className={`submit-container ${click1?"opacity1":"opacity0"}`}>
                                <h4>Submit</h4>
                                <label>{aobject.aname}</label>
                                <input type="number" name="assignmentid" value={aobject.aid}  readOnly/>
                                <input type="text" name="student" value={uploadassignment.student} onChange={changeofsubmission} required/>
                                <input type="file" placeholder="file" name="file" onChange={changeofsubmission} />
                                <input type="text" placeholder="Description" name="description" value={uploadassignment.description} onChange={changeofsubmission} required/>
                                <button className="submitbtn" onClick={(e)=>{e.preventDefault(); setclick1(!click1)}}>Cancel</button>
                                <button className="submitbtn" type="submit">Submit</button>
                            </form>
                           </div>
                            ):
                            (
                                <div>
                                  <div className="submit-content">
                                  <div className="submit-list">
                                    {
                                        checkgrade.map((item)=>{
                                         return(
                                           <div className="submit-item" key={item.id}>
                                            <span className="submit-title">{item.id}</span>
                                           <span className="submit-title">{item.aname}</span>
                                           <span className="submit-title">{item.comments}</span>
                                           <span className="submit-title">{item.grade}/100</span>
                                           </div>
                                         );
                                        })
                                    } 
                                    </div>
                                  </div>
                                </div>
                            )    
                        }
                        
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