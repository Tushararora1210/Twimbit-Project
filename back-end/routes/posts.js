const express=require('express');
const router=express.Router();
const {isLoggedin}=require('../functions');
const Post=require('../models/posts');
router.post('/createpost',isLoggedin,(req,res)=>{
const {title,body}=req.body;
const newPost={
    title,body,postedby:req.userId
};
newPost.save()
.then(()=>{
    res.json({message:"Post saved Successfully"});
})
.catch(err=>{
    res.json({error:err});
})
})

router.get('/likeanddislikepost/:postid',isLoggedin,(req,res)=>{
const {postid}=req.params;
Post.find({_id:postid})
.then((posts)=>{
    if(!posts.length)
    {
        return res.status(404).json({error:"No Post with this id is present"});
    }
     if(posts[0].likedby.indexOf(req.userId)==-1)
     {
       posts[0].push(req.userId);
       posts[0].save()
       .then(()=>{
           res.json({message:"Liked Successfully"});
       })
     }
    else
     {
       posts[0].splice(indexOf(req.userId),1);
       posts[0].save()
       .then(()=>{
           res.json({message:"Liked Successfully"});
       })
     }
  

})

})

router.get('/deletepost/:postid',isLoggedin,(req,res)=>{
    const {postid}=req.params;
Post.find({_id:postid})
.then((posts)=>{
    if(!posts.length)
    {
        return res.status(404).json({error:"No Post with this id is present"});
    }
    if(posts[0].postedby==req.userId)
    {
        posts[0].remove()
        .then(()=>{
            res.json(message:"Post deleted Successsfully");
        })
    }
    res.status(401).json(error:"You are not authorised to delete this post");
})
router.post('/updatepost',isLoggedin,(req,res)=>{
    const const {title,body,postid}=req.body;
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
        res.status(401).json(error:"You are not authorised to update this post");

    
})
module.exports=router;