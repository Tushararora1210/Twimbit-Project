import React,{useContext} from 'react'
import {useHistory} from "react-router-dom";
import {Toolbar, Typography,Button,TextField,Box,MenuItem} from '@material-ui/core';
import {AddBox, Menu as MenuIcon} from '@material-ui/icons';
import Finalmenu from './headermenu';
import axios from "axios";
import UserContext from '../store/usercontext.js';
import profimage from '../prof.png';
const Header = () => {
    const currentUser=useContext(UserContext);
    const { isLoggedin,getLoggedin,getLoggedinUser,Loggedinuser,searchtext,setSearchtext}=currentUser;
    console.log(Loggedinuser);
    const{image,username}=Loggedinuser;
    const history=useHistory();
    function logout()
    {
        axios.get('/logout')
        .then((response)=>{
            getLoggedin();
            getLoggedinUser();
            window.location.reload();
        })
    }
    return (
        <>
            <Toolbar className="header">
                <Box className="headerprev" display={{ xs: 'block', sm: 'block', md: 'none' }}>
                    <Finalmenu/>
                </Box>
             <Box className="headerfirst" >
                <Typography variant="h5" className="logo">
                   <a href="/" style={{textDecoration:"none",color:"white"}}> SharePost </a>
                </Typography>
                <Box display={{ xs: 'none', sm:'none', md:'block'}}>
                <TextField 
                onKeyPress={(e)=>{
                    if(e.key==='Enter')
                    {
                        window.location.href="http://localhost:3000/searchposts/"+e.target.value
                    }

                }}
                className="searchbox" label="Search" size="small" variant="outlined" />
                </Box>
            </Box>
            {isLoggedin?<Box className="headersecond" display={{ xs: 'none', sm:'none',md:'block'}}>
                     <a href="/createpost">Create Post</a>
                     
                     <img src={image===""?profimage:image}  />
                    <b> <p style={{fontSize:"0.8em",position:"relative",left:"-20px"}}>{username}</p> </b>
            

                      
                    <Button variant="contained" size="small" onClick={logout}>
                        Logout
                    </Button>
            </Box> :
            <Box className="headersecond" display={{ xs: 'none', sm:'none',md:'block'}}>
            
            <Button variant="contained" size="small" onClick={()=>{
                history.push('/register');
                window.location.reload();
            }}>
                Create Account
            </Button>
            </Box>}
            </Toolbar>
        </>
    )
}

export default Header
