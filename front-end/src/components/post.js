import React,{useContext,useState} from 'react'
import UserContext from '../store/usercontext.js';
import axios from "axios";
import profimage from '../prof.png';
import {Button} from "@material-ui/core";
import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded';
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';
function Post(props){
    const currentUser=useContext(UserContext);
    const {Loggedinuser}=currentUser;
    const{image}=Loggedinuser;
    const [likecolor,setLikecolor]=useState("LightGray");
    const [likes,setlikes]=useState(0);

    function getpostlike(postid)
    {
        axios.get(`/getlikes/{postid}`)
        .then((response)=>{
            setlikes(response.data.likecount);
        })
        .catch(err=>{
        console.log("Not fetched")
        })
    }
    function likepost(postid)
    {
        axios.get("/likeanddislikepost/"+postid)
        .then(response=>{
            console.log(response);
            getpostlike(postid);
            likecolor=="LightGray"?setLikecolor("Tomato"):setLikecolor("LightGray");
        })
       
    }
    getpostlike(props.postid);
    return (
        <div className="showpost">
            <span>
            <img src={props.image}  style={{width:"2.5em",height:"2.5em",marginTop:"1.5em",borderRadius:"50%"}} />
           <div>
            <p>{props.username}</p>
            <p style={{fontSize:"0.8em",position:"relative",top:"-12px"}}>Posted on</p>
            </div>
            </span>
            
            
            <h2>{props.title}</h2>
            <span class="likeandcomment">
            <Button variant="contained" 
                size="small"  className="likebutton" 
                style={{backgroundColor:likecolor}}
                onClick={()=>likepost(props.postid)}  >

            <ThumbUpAltRoundedIcon/> {likes}
        </Button>
        <Button variant="contained" 
                size="small"  className="commentbutton"  >
             <ChatBubbleOutlineRoundedIcon/> {props.commentcount}
        </Button>
        </span>

        </div>
    )
}
export default Post;
