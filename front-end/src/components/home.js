import React,{useState,useEffect} from 'react';
import Post from './post';
import profimage from '../prof.png';
import axios from "axios";
import {Button} from "@material-ui/core";

function Home(){
    const [currpage,setCurrpage]=useState(1);
    const [posts,setPosts]=useState([]);
    const [isnext,setIsnext]=useState(true);
    const [isprev,setIsprev]=useState(true);
    
    
    function Fetchposts()
    {
        axios.get('/showallposts')
        .then((response)=>{
            const currposts=[];
            console.log("Currpage is",currpage);
            console.log(response.data.posts);
            for(let i=(currpage-1)*10;i<currpage*10;i++)
            {
                if(i<response.data.posts.length)
                {
                    console.log(i," ");
                    console.log(response.data.posts[i]);
                    currposts.push(response.data.posts[i]);
                }
                
            }
           // console.log(currposts);
            setPosts(currposts);
            if(currpage==1)
            {
                setIsprev(false);
            }
            else
            {
                setIsprev(true);
            }
            if(currpage*10>=response.data.posts.length)
            {
                setIsnext(false);
                
            }
            else
            {
                setIsnext(true);
            }

        }
            )
        
       
    }
    function changenextprev(next,prev)
    {
        
        if(next)
        {
            console.log("Clicked next")
            setCurrpage(currpage+1);
        }
        if(prev){
            console.log("Clicked prev")
            setCurrpage(currpage-1);
        }   
    }
    useEffect(()=>{
        Fetchposts();
    },[currpage])
    return (
        <>
        <div>
            {posts.map((post)=>{
                return(
                <Post postid={post._id} title={post.title} username={post.postedby.username} image={profimage} />
                )
            })
        }
        </div>
        <div className="changeposts">
        <Button variant="contained" 
                size="small"  className="likebutton" disabled={!isprev}
                onClick={()=>{changenextprev(false,true)}}>
             Previous
        </Button>
        <Button variant="contained" 
                size="small"  className="likebutton"  
                onClick={()=>{changenextprev(true,false)}}
                disabled={!isnext}
                > Next

        </Button>

        </div>
        </>
    )
}

export default Home;
