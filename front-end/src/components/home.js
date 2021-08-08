import React,{useState} from 'react';
import Post from './post';
import profimage from '../prof.png';
import axios from "axios";

function Home(){
    const [posts,setPosts]=useState([]);
    function Fetchposts()
    {
        axios.get('/showallposts')
        .then((response)=>{
            
            setPosts(response.data.posts);
        }
            )
        
       
    }
    Fetchposts();
    return (
        <div>
            {posts.map((post)=>{
                return(
                <Post postid={post._id} title={post.title} username={post.postedby.username} image={profimage} />
                )
            })
        }
        </div>
    )
}

export default Home;
