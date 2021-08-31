import React, { useState,useContext } from "react";
import {useHistory} from "react-router-dom";
import {TextField,Button} from "@material-ui/core";
import UserContext from '../store/usercontext.js';
import MuiAlert from "@material-ui/lab/Alert";
import Alert from "../store/functions";
import axios from "axios";
function Createpost(){
    const currentUser=useContext(UserContext);
    const { message,setMessage}=currentUser;
    const [title,setTitle]=useState("");
    const [body,setBody]=useState("");
    const history=useHistory();
    function createpostfun()
    {
        if(title=="" || body=="")
        {
            setMessage({success:"",failure:"Please Enter all the fields"})
        }
        else
        {
            const postbody={
                title:title,
                body:body
            }
            axios.post('/createpost',postbody)
            .then((response)=>{
                setMessage({success:"Post Successfully Created",failure:""});
            })
            .catch((error)=>{
                console.log(error);
                setMessage({success:"",failure:"Unable to Create Post"});
            })

        }
        setTimeout(()=>{
            setMessage({success:"",failure:""});
            history.push('/');
            window.location.reload();
        },1000)



    }
    return (
        <>
        <div className="message">
        {message.success!="" && <Alert severity="success">{message.success}</Alert>}
    {message.failure!="" && <Alert severity="error">{message.failure}</Alert> }
      
     </div>
        <div className="createpostclass">
            <h1>Guys Let us Create a new Post</h1>
            <h4>Title</h4>
            <TextField
        label="Title of the Post"
        onChange={(e) => {
        setTitle(e.target.value);
        }} 
        onKeyPress={(e)=>{
            if(e.key==='Enter')
             {
                 createpostfun();
             }
            }}
      />
      <br/>
      <h4>Body</h4>
           <textarea placeholder="Enter the body of the post" onChange={(e) => {
        setBody(e.target.value);
        }} 
        onKeyPress={(e)=>{
            if(e.key==='Enter')
             {
                 createpostfun();
             }
            }}>

           </textarea>
           <br/>
           <Button variant="contained" 
                size="large"  className="createpostbutton" onClick={createpostfun}>
             Create Post
        </Button>
        </div>
        </>
    )
}

export default Createpost
