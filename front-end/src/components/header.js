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
    const { isLoggedin,getLoggedin,getLoggedinUser,Loggedinuser}=currentUser;
    const{image}=Loggedinuser;
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
                    SharePost
                </Typography>
                <Box display={{ xs: 'none', sm:'none', md:'block'}}>
                <TextField className="searchbox" label="Search" size="small" variant="outlined" />
                </Box>
            </Box>
            {isLoggedin?<Box className="headersecond" display={{ xs: 'none', sm:'none',md:'block'}}>
                     <a href="">Create Post</a>
                    <img src={image===""?profimage:image}  />
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
