import React,{useContext,useState} from 'react';
import {useHistory} from "react-router-dom";
import {Button,Container} from '@material-ui/core';
import UserContext from '../store/usercontext.js';
import Alert from '../store/functions';
import {Apple as AppleIcon,GitHub as GitHubIcon,Twitter as TwitterIcon} from '@material-ui/icons/';
import Header from './header';
import Footer from './footer';
import axios from 'axios';
function Register()
{
const currentUser=useContext(UserContext);
const history=useHistory();
const [name,setName]=useState("");
const [username,setUsername]=useState("");
const [email,setEmail]=useState("");
const [bio,setBio]=useState("");
const [password,setPassword]=useState("");

const { isLoggedin,getLoggedin,message,setMessage}=currentUser;

const githublogin=()=>{
history.push("https://github.com/login/oauth/authorize?client_id=5e73531deb7590e9d133")
}
const registeruser=()=>{
    const biography=bio.split(",");
    const body={
        name:name,
        username:username,
        email:email,
        password:password,
        bio:biography
    }
   
    axios.post('/register',body)
    .then((response)=>{
        console.log(response);
        setMessage({success:"Successfully Registered",failure:""});
        window.location.reload();
        setTimeout(()=>{
        setMessage({success:"",failure:""});
        },1000);
    })
    .catch(err=>{
        if(name==="" || username==="" || email==="" || password==="")
        {
            setMessage({success:"",failure:"Please Enter all the fields"});
        }
        else
        {
            setMessage({success:"",failure:"User with the Following details already exists"});
        }
        setTimeout(()=>{
            setMessage({success:"",failure:""});
            },3000);
        
    })
}
return(
    <div  style={{backgroundColor:"whitesmoke"}}>
        <div className="message" style={{zIndex:"4"}}>
        {message.success!="" && <Alert severity="success">{message.success}</Alert>}
    {message.failure!="" && <Alert severity="error">{message.failure}</Alert> }
      
     </div>
        <Container maxWidth="sm" style={{backgroundColor:"white",borderStyle:"ridge",textAlign:"center"}}>
        <h1>Welcome to the Post Sharing Community</h1>
        <p>Our Community is a community of more than 6lakh developers</p>
    
        <a href='https://github.com/login/oauth/authorize?client_id=5e73531deb7590e9d133' style={{textDecoration:"none"}}>
        <Button variant="contained" 
                size="large" startIcon={<GitHubIcon/>} className="githubbutton">
             Continue With GitHub
        </Button>
        </a>
        <p className="havepassword">
        <span >
        Have a Password?Continue with your email address
        </span>
        </p>
        
        <div className="loginform">
           <label for="name" >Name</label>
            <input type="text" id="name" placeholder="Name" onChange={(e)=>setName(e.target.value)}
            onKeyPress={(e)=>{
                if(e.key==='Enter')
                 {
                     registeruser();
                 }
                }}
            ></input>
            <label for="username" >Username</label>
            <input type="text"  onChange={(e)=>setUsername(e.target.value)} id="username" placeholder="Username"
            onKeyPress={(e)=>{
                if(e.key==='Enter')
                 {
                     registeruser();
                 }
                }}
            ></input>
            <label for="bio" >Bio</label>
            <input type="text" onChange={(e)=>setBio(e.target.value)} id="bio" placeholder="Bio"
            onKeyPress={(e)=>{
                if(e.key==='Enter')
                 {
                     registeruser();
                 }
                }}
            ></input>
            
            <label for="email" >Email</label>
            <input type="email"  onChange={(e)=>setEmail(e.target.value)} id="email" placeholder="Email"
            onKeyPress={(e)=>{
                if(e.key==='Enter')
                 {
                     registeruser();
                 }
                }}
            ></input>
            <br/>
            <label for="password" >Password</label>
            <input type="password"  onChange={(e)=>setPassword(e.target.value)}
         id="password" placeholder="Password"
         onKeyPress={(e)=>{
            if(e.key==='Enter')
             {
                 registeruser();
             }
            }}
         ></input>
            <Button variant="contained" 
                size="large"  className="submitbutton" onClick={registeruser} >
             Continue
        </Button>
        </div>

        <a href="/login">Already have an account?Sign in</a>
        </Container>
    </div>
)
}
export default Register;