import React,{useContext,useState} from 'react'
import { useHistory } from 'react-router';
import UserContext from '../store/usercontext.js';
import axios from "axios";
import {Link} from "react-router-dom";
import profimage from '../prof.png';
import {Button} from "@material-ui/core";
import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded';
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';
function Post(props){
    const currentUser=useContext(UserContext);
    const {Loggedinuser}=currentUser;
    const [likecolor,setLikecolor]=useState("LightGray");
    const [likes,setlikes]=useState(0);
    const [image,setimage]=useState("");
    const [comments,setComments]=useState(0);
    const history=useHistory();
    function getpostlike(postid)
    {   
        axios.get("/getlikes/"+postid)
        .then((response)=>{
            setlikes(response.data.likecount);
        })
        .catch(err=>{
        console.log("Not fetched")
        })

        axios.get("/isliked/"+postid)
        .then((response)=>{
            if(response.data.liked=="true")
            {
                setLikecolor("Tomato");
            }
            else
            {
                setLikecolor("LightGray");
            }
        })
    }
    function likepost(postid)
    {
        axios.get("/likeanddislikepost/"+postid)
        .then(response=>{

            getpostlike(postid);
            
        })
       
    }
    function getpostuserimage(postid)
    {
        axios.get("/getpost/"+postid)
        .then((response)=>{
            const foundpost=response.data.foundpost;
            //console.log(foundpost);
    
            axios.get("/user/"+foundpost.postedby.username)
            .then((response)=>{
                setimage(response.data.user.image)
            })
        })
    }
    function getpostcomment(postid)
    {
        axios.get("/getcomments/"+postid)
        .then(response=>{
            setComments(response.data.commentcount);
        })
    }
    getpostlike(props.postid);
    getpostcomment(props.postid);
    getpostuserimage(props.postid);
    return (
        <div className="showpost">
           
            <span>
            <img src={image==""?props.image:image}  style={{width:"2.5em",height:"2.5em",marginTop:"1.5em",borderRadius:"50%"}} />
           <div>
            <p>{props.username}</p>
            <p style={{fontSize:"0.8em",position:"relative",top:"-12px"}}>Posted on</p>
            </div>
            </span>
            
            <Link to={"/showpost/"+props.postid} id="redirectlink">
            <h2>{props.title}</h2>
            </Link>
            <span class="likeandcomment">
            <Button variant="contained" 
                size="small"  className="likebutton" 
                style={{backgroundColor:likecolor}}
                onClick={()=>likepost(props.postid)}  >

            <ThumbUpAltRoundedIcon/> {likes}
        </Button>
        <Button variant="contained" 
                size="small"  className="commentbutton"  >
             <ChatBubbleOutlineRoundedIcon/> <a style={{textDecoration:"none"}} href={"/showpost/"+props.postid}>{comments}</a>
        </Button>
        </span>

        </div>
    )
}
export default Post;
