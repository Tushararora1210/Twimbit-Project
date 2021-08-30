const express=require('express');
const router=express.Router();
const {isLoggedin}=require('../functions');
const Comment=require('../models/comments');
const Post=require('../models/posts');
router.post('/comment',isLoggedin,(req,res)=>{
    const {text,postid}=req.body;
    if(!text ||!postid)
    {
        return res.status(422).json({error:"Either text or post id is missing"});
    }
Post.find({_id:postid})
.then((posts)=>{
    if(!posts.length)
    {
        return res.status(404).json({error:"Post not found"});
    }
    const newcomment=new Comment({text,Commentedby:req.userId,Commentedon:postid});
    newcomment.save()
    .then(()=>{
        res.json({message:"Successfully Commented"});
    })
    .catch(err=>{
        res.status(400).json({error:err});
    })

    })
    .catch(err=>{
        res.status(400).json({error:err});
})
})

router.get('/deletecomment/:commentid',isLoggedin,(req,res)=>{
    const {commentid}=req.params;
    comment.find({_id:commentid})
    .then((comments)=>{
        if(!comments.length)
        {
            return res.status(404).json({error:"No Comment with this id is present"});
        }
        if(comments[0].Commentedby==req.userId)
        {
            comments[0].remove()
            .then(()=>{
                res.json({message:"Comment deleted Successsfully"});
            })
        }
        res.status(401).json({error:"You are not authorised to delete this comment"});

})
})


router.post('/editcomment',isLoggedin,(req,res)=>{
const {text,commentid}=req.body;
Comment.find({_id:commentid})
.then((comments)=>{
    if(!comments.length)
    {
        return res.status(404).json({error:"No Comment with this id is present"});
    }
    if(comments[0].Commentedby==req.userId)
    {
        comments[0].text=text;
        comments[0].save()
        .then(()=>{
            res.json({message:"Comment Updated Successfully"});
        })
    }
    res.status(401).json({error:"You are not authorised to update this comment"});


})
})

router.get('/getcomments/:postid',(req,res)=>{
Comment.find({Commentedon:req.params.postid})
.then((comments)=>{
    console.log(comments);
return res.json({commentcount:comments.length});
})
.catch((err)=>{
    return res.status(404).json({error:"Post with the following id not found"});
})
})

module.exports=router;