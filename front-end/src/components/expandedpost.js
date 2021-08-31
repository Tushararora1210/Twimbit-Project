import React,{useContext,useState} from "react";
import { useHistory } from "react-router-dom";
import UserContext from '../store/usercontext.js';
import axios from "axios";
import profimage from '../prof.png';
import {Button} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded';
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';
import Alert from '../store/functions';
function Expandedpost(props)
{
   const history=useHistory();
    const currentUser=useContext(UserContext);
    const { isLoggedin,getLoggedin,message,setMessage,Loggedinuser}=currentUser;
    const [likecolor,setLikecolor]=useState("LightGray");
    const [likes,setlikes]=useState(0);
    const [comments,setComments]=useState(0);
    const [postimage,setPostimage]=useState("");
    const [postusername,setpostusername]=useState("");
    const [posttitle,setposttitle]=useState("");
    const [postdesc,setpostdesc]=useState("");
    const [allcomments,setallcomments]=useState([]);
    const [typedtext,setTypedtext]=useState("");
    console.log(props.match.params.id);
    
    let textInput = React.createRef();
    function handleClick() {
        textInput.current.focus();
        
      }
    function deletepost()
    {
        for(var i=0;i<allcomments.length;i++)
            {
                console.log(allcomments);
                deletecommentwithoutmessage(allcomments[i]._id);
            }
        axios.get("/deletepost/"+props.match.params.id)
        .then((res)=>{
            
            setMessage({success:"Post deleted Successfully",failure:""});
            setTimeout(()=>{
                setMessage({success:"",failure:""});
            },1000)
           history.push('/');
           window.location.reload();
           
            

        })
        .catch((err)=>{
            console.log("error is",err)
            setMessage({success:"",failure:"Unable to delete Post"});
            setTimeout(()=>{
                setMessage({success:"",failure:""});
            },3000)
        })
        
    }
    function deletecommentwithoutmessage(commentid)
    {
        console.log("commentid is",commentid);
        axios.get("/deletecomment/"+commentid)
        .then((res)=>{
            console.log("response is",res);
        })
        .catch((err)=>{
            console.log("error is",err);
        })
    }
    function deletecomment(commentid)
    {
        axios.get("/deletecomment/"+commentid)
        .then((res)=>{
            console.log("response is",res);
            setMessage({success:"Comment deleted Successfully",failure:""});
            setTimeout(()=>{
                setMessage({success:"",failure:""});
            },3000)
        })
        .catch((err)=>{
            console.log("error is",err);
            setMessage({success:"",failure:"Unable to delete comment"});
            setTimeout(()=>{
                setMessage({success:"",failure:""});
            },3000)
        })
    }
    function commentonpost()
    {
        if(typedtext=="")
        {
            setMessage({success:"",failure:"Please Type the comment First"});
            setTimeout(()=>{
                setMessage({success:"",failure:""});
            },3000)
        }
        else
        {
            axios.post('/comment',{
                text:typedtext,
                postid:props.match.params.id
            })
            .then((response)=>{
               
                getpostcomment(props.match.params.id);  
                setMessage({success:"Commented Successfully",failure:""});
            setTimeout(()=>{
                setMessage({success:"",failure:""});
            },3000) 
            })
            .catch(err=>{  
               
                setMessage({success:"",failure:"Failed to Comment"});
            setTimeout(()=>{
                setMessage({success:"",failure:""});
            },3000)
            })
        }
    }
    function getpostuserimage()
    {
        axios.get("/getpost/"+props.match.params.id)
        .then((response)=>{
            const foundpost=response.data.foundpost;
            //console.log(foundpost);
            setpostusername(foundpost.postedby.username);
            setposttitle(foundpost.title);
            setpostdesc(foundpost.body);
            axios.get("/user/"+foundpost.postedby.username)
            .then((response)=>{

                setPostimage(response.data.user.image);
            })
        })
    }
    function getpostlike(postid)
    {
        
        axios.get("/getlikes/"+postid)
        .then((response)=>{
            setlikes(response.data.likecount);
        })
        .catch(err=>{
       // console.log("Not fetched")
        })

        axios.get("/isliked/"+postid)
        .then((response)=>{
            //console.log("response is",response);
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
    function getpostcomment(postid)
    {
        axios.get("/getcomments/"+postid)
        .then(response=>{
            for(var i=0;i<response.data.commentcount;i++)
            {
                axios.get("/user/"+response.data.commentonpost[i].username)
                .then(res=>{
                    response.data.commentonpost[i].image=res.data.user.image;
                })
            
            }
            setComments(response.data.commentcount);
            setallcomments(response.data.commentonpost);
        })
        console.log("comments are",allcomments)

        
    }
    getpostlike(props.match.params.id);
    getpostcomment(props.match.params.id);
    getpostuserimage();
    //getcommentimage();
    return (
        <div>
        <div className="message">
            {message.success!="" && <Alert severity="success">{message.success}</Alert>}
            {message.failure!="" && <Alert severity="error">{message.failure}</Alert> }
        </div>
        <div className="showexpandedpost">
           
            <span>
            <img src={postimage==""?profimage:postimage}  style={{width:"2.5em",height:"2.5em",marginTop:"1.5em",borderRadius:"50%"}} />
           <div>
            <p>{postusername}</p>
            <p style={{fontSize:"0.8em",position:"relative",top:"-12px"}}>Posted on</p>
            </div>
            <div className="delicon">
            {isLoggedin && Loggedinuser.username==postusername && <DeleteIcon onClick={()=>{
                deletepost();
                
                //window.location.reload();
            }}/>}
            </div>
            </span>
            
            <h2>{posttitle}</h2>
            <p>{postdesc}</p>
            <span class="likeandcomment">
            <Button variant="contained" 
                size="small"  className="likebutton" 
                style={{backgroundColor:likecolor}}
                onClick={()=>likepost(props.match.params.id)}  >

            <ThumbUpAltRoundedIcon/> {likes}
        </Button>
        <Button variant="contained" 
                size="small"  className="commentbutton"  onClick={handleClick} >
             <ChatBubbleOutlineRoundedIcon/> {comments}
        </Button>
        </span>

        </div>
        <div className="showcomments">
            <div className="topcomment">
            <h3>Comments </h3>
            <h4>{comments}</h4>
            </div>

            <div className="bottomcomment">
                {allcomments.map((eachcomment)=>{
                    return(<div className="showcomment">
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                        <div className="commenttopsection">
                         <img src={profimage}  style={{width:"1.5em",height:"1.5em",marginTop:"1.5em",borderRadius:"50%"}} />
                        <p>{eachcomment.Commentedby.username}</p>
                        </div>
                        {isLoggedin && (Loggedinuser.username==eachcomment.Commentedby.username || Loggedinuser._id==eachcomment.Commentedon.postedby) && <DeleteIcon onClick={()=>{
                            deletecomment(eachcomment._id);
                            getpostcomment(props.match.params.id);
                        }}/> }
                        
                        </div>
                        <p id="commenttext">{eachcomment.text} </p>
                    </div>)
                })}
                <textarea style={{width:"55vw",resize:"none",height:"75px"}}
                onChange={(e)=>
                {
                    setTypedtext(e.target.value);
                }

                }

                onKeyPress={(e)=>{
                    if(e.key==='Enter')
                     {
                         commentonpost();
                         textInput.current.value="";
                     }
                    }}
                    ref={textInput}
               ></textarea>
                <Button variant="contained" 
                size="small"  className="postbutton" 
                style={{backgroundColor:"blue"}}
                onClick={()=>{
                   commentonpost();
                    textInput.current.value="";
                }}  >
                    Post
        </Button>
            </div>
            

        </div>
        </div>
    )
}
export default Expandedpost;