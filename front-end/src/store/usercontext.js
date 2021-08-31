import {createContext,useState,useEffect} from 'react';
import axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";
import Alert from "./functions";
const UserContext=createContext();
export function UserContextProvider(props)
{
const [isLoggedin,setIsLoggedin]=useState(undefined);
const [Loggedinuser,setLoggedinuser]=useState({image:""});
const [message,setMessage]=useState({success:"",failure:""});

async function getLoggedin()
{
    axios.get('/isloggedin')
    .then((response)=>{
            setIsLoggedin(true);
    })
    .catch((err)=>{
        setIsLoggedin(false);
    })

}
async function getLoggedinUser()
{
if(!isLoggedin)
{
    setLoggedinuser({image:""});
}
else
{
    axios.get('/getuser')
    .then(response=>{
        console.log(response.data)
        setLoggedinuser(response.data.user);
    })
}
}

    useEffect(()=>{
        getLoggedinUser();

    },[isLoggedin])

    const context={
        isLoggedin:isLoggedin,
        getLoggedin:getLoggedin,
        Loggedinuser:Loggedinuser,
        getLoggedinUser:getLoggedinUser,
        message:message,
        setMessage:setMessage,
        
    }
return(
    <UserContext.Provider value={context}>
        {props.children}
    </UserContext.Provider>
)
}
export default UserContext;

