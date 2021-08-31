const express=require('express');
const router=express.Router();
const {isLoggedin}=require('../functions');
const post=require("../models/posts");
const User=require('../models/users');
router.get('/showallposts',(req,res)=>{
    post.find({}).populate('postedby','username')
    .then((posts)=>{
        res.json({posts:posts});
    })
    .catch((err)=>{
        res.status(422).json({error:err});
    })
})
router.get('/getpost/:postid',(req,res)=>{
    post.find({_id:req.params.postid}).populate('postedby','username')
    .then((posts)=>{
        if(!posts.length)
        {
            return res.status(404).json({error:"Post with the following id not found"});
        }
        return res.json({foundpost:posts[0]});
    })
})
router.post('/createpost',isLoggedin,(req,res)=>{
const {title,body}=req.body;
console.log(req.userId);
const newPost=new post({
    title,body,postedby:req.userId
})
newPost.save()
.then(()=>{
    res.json({message:"Post saved Successfully"});
})
.catch(err=>{
    console.log(error);
    res.json({error:err});
})
})
router.get('/isliked/:postid',isLoggedin,(req,res)=>{
    post.find({_id:req.params.postid})
    .then((posts)=>{
        if(!posts.length)
        {
            return res.status(404).json({message:"Post with this id doesn't exist"});
        }
        if(posts[0].likedby.indexOf(req.userId)==-1)
        {
            return res.json({liked:"false"})
        }
        else
        {
            return res.json({liked:"true"})
        }
        
    })
})
router.get('/getlikes/:postid',(req,res)=>{
    post.find({_id:req.params.postid})
    .then((posts)=>{
        if(!posts.length)
        {
            return res.status(404).json({message:"Post with this id doesn't exist"});
        }
        return res.json({likecount:posts[0].likedby.length});
    })
})
router.get('/likeanddislikepost/:postid',isLoggedin,(req,res)=>{
const {postid}=req.params;
console.log("id is",postid);
post.find({_id:postid})
.then((posts)=>{
    if(!posts.length)
    {
        return res.status(404).json({error:"No Post with this id is present"});
    }
     if(posts[0].likedby.indexOf(req.userId)==-1)
     {
       posts[0].likedby.push(req.userId);
       posts[0].save()
       .then(()=>{
           res.json({message:"Liked Successfully"});
       })
     }
    else
     {
       posts[0].likedby.splice(posts[0].likedby.indexOf(req.userId),1);
       posts[0].save()
       .then(()=>{
           res.json({message:"Disliked Successfully"});
       })
     }
  

})

})


router.get('/deletepost/:postid',isLoggedin,(req,res)=>{
    const {postid}=req.params;
post.find({_id:postid})
.then((posts)=>{
    if(!posts.length)
    {
        return res.status(404).json({error:"No Post with this id is present"});
    }
    if(posts[0].postedby==req.userId)
    {
        posts[0].remove()
        .then(()=>{
           return res.json({message:"Post deleted Successsfully"});
        })
    }
    else{
        return res.status(401).json({error:"You are not authorised to delete this post"});
    }

    
})
.catch(err=>{
    console.log("Error is",err)
})
})
router.post('/updatepost',isLoggedin,(req,res)=>{
    const {title,body,postid}=req.body;
    Post.find({_id:postid})
    .then((posts)=>{
        if(!posts.length)
        {
            return res.status(404).json({error:"No Post with this id is present"});
        }
        if(posts[0].postedby==req.userId)
        {
            posts[0].title=title;
            posts[0].body=body;
            posts[0].save()
            .then(()=>{
                res.json({message:"Post Updated Successfully"});
            })
        }
        res.status(401).json({error:"You are not authorised to update this post"});

    
})
})
module.exports=router;