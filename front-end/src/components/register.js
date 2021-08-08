import React,{useState} from 'react';
import {useHistory} from "react-router-dom";
import {Button,Container} from '@material-ui/core';
import {Apple as AppleIcon,GitHub as GitHubIcon,Twitter as TwitterIcon} from '@material-ui/icons/';
import Header from './header';
import Footer from './footer';
import axios from 'axios';
function Register()
{
const history=useHistory();
const [name,setName]=useState("");
const [username,setUsername]=useState("");
const [email,setEmail]=useState("");
const [bio,setBio]=useState("");
const [password,setPassword]=useState("");

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
        window.location.reload();
    })
    .catch(err=>{
        console.log(err.message);
    })
}
return(
    <div  style={{backgroundColor:"whitesmoke"}}>
        <Container maxWidth="sm" style={{backgroundColor:"white",borderStyle:"ridge",textAlign:"center"}}>
        <h1>Welcome to the Post Sharing Community</h1>
        <p>Our Community is a community of more than 6lakh developers</p>
        <Button variant="contained" 
                size="large" startIcon={<AppleIcon/>} className="applebutton" >
            Continue With Apple
        </Button>
        <a href='https://github.com/login/oauth/authorize?client_id=5e73531deb7590e9d133' style={{textDecoration:"none"}}>
        <Button variant="contained" 
                size="large" startIcon={<GitHubIcon/>} className="githubbutton">
             Continue With GitHub
        </Button>
        </a>
        <Button variant="contained" 
                size="large" startIcon={<TwitterIcon/>} className="twitterbutton" >
             Continue With Twitter
        </Button>
        <p className="havepassword">
        <span >
        Have a Password?Continue with your email address
        </span>
        </p>
        
        <div className="loginform">
           <label for="name" >Name</label>
            <input type="text" id="name" placeholder="Name" onChange={(e)=>setName(e.target.value)} ></input>
            <label for="username" >Username</label>
            <input type="text"  onChange={(e)=>setUsername(e.target.value)} id="username" placeholder="Username"></input>
            <label for="bio" >Bio</label>
            <input type="text" onChange={(e)=>setBio(e.target.value)} id="bio" placeholder="Bio"></input>
            
            <label for="email" >Email</label>
            <input type="email"  onChange={(e)=>setEmail(e.target.value)} id="email" placeholder="Email"></input>
            <br/>
            <label for="password" >Password</label>
            <input type="password"  onChange={(e)=>setPassword(e.target.value)}
         id="password" placeholder="Password"></input>
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