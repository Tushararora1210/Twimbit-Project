import React,{useContext,useState} from 'react';
import {useHistory, Redirect,render} from "react-router-dom";
import {Button,Container} from '@material-ui/core';
import UserContext from '../store/usercontext.js';
import { Snackbar } from '@material-ui/core';
import MuiAlert from "@material-ui/lab/Alert";
import Alert from '../store/functions';
import {Apple as AppleIcon,GitHub as GitHubIcon,Twitter as TwitterIcon} from '@material-ui/icons/';
import Header from './header';
import Footer from './footer';
import axios from "axios";
function Login()
{
const history=useHistory();
const currentUser=useContext(UserContext);
  const { isLoggedin,getLoggedin,message,setMessage}=currentUser;
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
console.log("Login page")
console.log(currentUser);
function loginsubmit()
{
    const body={email:email,password:password};
    axios.post('/login',body)
    .then((response)=>{
        console.log(response);
        setMessage({success:"Successfully Logged in",failure:""});
        window.location.reload();
        setTimeout(()=>{
        setMessage({success:"",failure:""});
        },3000);

    })
    .catch((err)=>{
        if(email==""|| password=="")
        {
            setMessage({success:"",failure:"Please Enter all the fields"});
        }
        else
        {
            setMessage({success:"",failure:"Invalid Credentials"});
        }        
        setTimeout(()=>{
        setMessage({success:"",failure:""});
        },3000);
    })
}

return(
    <> 
    <div className="message">
        {message.success!="" && <Alert severity="success">{message.success}</Alert>}
    {message.failure!="" && <Alert severity="error">{message.failure}</Alert> }
      
     </div>
    <div  style={{backgroundColor:"whitesmoke"}}>
        <Container maxWidth="sm" style={{backgroundColor:"white",borderStyle:"ridge",textAlign:"center"}}>
        <h1>Welcome to the Post Sharing Community</h1>
        <p>Our Community is a community of more than 6lakh developers</p>
        <Button variant="contained" 
                size="large" startIcon={<AppleIcon/>}
                
                className="applebutton" >
            Continue With Apple
        </Button>

        <a href='https://github.com/login/oauth/authorize?client_id=5e73531deb7590e9d133' style={{textDecoration:"none"}}> <Button variant="contained" 
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
            <label for="email" >Email</label>
            <input type="email"  placeholder="Email" onChange={(e)=>{
                setEmail(e.target.value);
            }}
            onKeyPress={(e)=>{
                if(e.key==='Enter')
                 {
                     loginsubmit();
                 }
                }}
            ></input>
            <br/>
            <label for="password" >Password</label>
            <input type="password"  placeholder="Password" onChange={(e)=>{
                setPassword(e.target.value);
            }} 
            onKeyPress={(e)=>{
                if(e.key==='Enter')
                 {
                     loginsubmit();
                 }
                }}
            ></input>
            <input type="checkbox"  value="remember"></input>
            <label for="remember">Remember Password?</label>
            <Button variant="contained" 
                size="large"  className="submitbutton" onClick={loginsubmit}>
             Continue
        </Button>
        </div>

        <a href="">Forgot Password?</a>
        </Container>
    </div>
    </>
)
}
export default Login;