const express=require('express');
const router=express.Router();
const axios=require('axios');
const dotenv=require('dotenv');
dotenv.config();
const clientID=process.env.clientid;
const clientSecret=process.env.clientsecret;
const jwt=require('jsonwebtoken');
const {extractaccesstoken,isLoggedin}=require('../functions');
const user=require('../models/users');
router.get('/github/callback',(req,res)=>{
    const requestToken=req.query.code;
    axios.post(`https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    {
        headers: {
               accept: 'application/json'
            } 
    })
    .then((response)=>{
        console.log(response.data);
        const access_token=extractaccesstoken(response.data);
        if(access_token.length){    
        axios.get(`https://api.github.com/user`,{
            headers: {
                    Authorization: 'token ' + access_token
                }
            })
        .then(response=>{
            user.find({
                username:response.data.login
            })  
            .then((users)=>{
                if(users.length)
                {
                    console.log(users[0]);
                    const token=jwt.sign({
                        user_id:users[0]._id
                    },process.env.tokenkey);
                    return res.cookie("access_token", token).status(200)
                    .redirect('http://localhost:3000/');
                }
                const {name,login,avatar_url,bio}=response.data;
                const newuser=new user({name,username:login,image:avatar_url,bio,
                authdetails:"Github"});
                newuser.save()
                .then((user)=>{
                    console.log(user);
                    const token=jwt.sign({
                        user_id:user._id
                    },process.env.tokenkey);
                    return res.cookie("access_token", token).status(200)
                    .json({ message: "Registered successfully" });
                })
                .catch(err=>{
                    res.json({error:err});
                })

            })
        })
        }
        else
        {
        res.json({error:"No access Token with the code found"});
        }
     })
     .catch(err=>{
       console.log(err);
       res.json({error:err});
      })
        
    })
router.get('/posts',isLoggedin,(req,res)=>{
    res.send("Posts");
})
router.post('/register',(req,res)=>{
    const {name,email,username,password,bio}=req.body;
    if(!name|| !email || !username || !password )
    {
        res.status(422).json({error:"Please Enter all the fields"});
    }
    const newuser=new user({name,username,email,password,authdetails:"sharepost",bio});
    newuser.save()
    .then((user)=>{
        console.log(user);
        const token=jwt.sign({
        user_id:user._id
        },process.env.tokenkey);
        return res.cookie("access_token", token).status(200)
        .json({ message: "Registered successfully" }); 
    })
    .catch(err=>{
        res.status(409).json({error:err});
    })

})

router.post("/login",(req,res)=>{
    const {email,password}=req.body;
    if( !email || !password)
    {
        res.status(422).json({error:"Please Enter all the fields"});
    }
    user.find({email,password})  
            .then((users)=>{
                if(users.length)
                {
                    console.log(users[0]);
                    const token=jwt.sign({
                        user_id:users[0]._id
                    },process.env.tokenkey);
                    return res.cookie("access_token", token).status(200)
                    .json({ message: "Logged in successfully" });
                }
                res.status(422).json({error:"Either email or password is invalid"});
                
})
})
router.get("/isloggedin",isLoggedin,(req,res)=>{
    res.send("User is Logged in");
})
router.get("/logout", isLoggedin, (req, res) => {
    return res
      .clearCookie("access_token")
      .status(200)
      .json({ message: "Successfully logged out" });
  });
router.get("/getuser",isLoggedin,(req,res)=>{
    user.find({_id:req.userId})
    .then((users)=>{
        const founduser=users[0];
        founduser.password="";
        res.json({user:founduser});
    })
    .catch((err)=>{
        res.status(404).json({error:"User with the following id not found"})
    })
})
module.exports=router;
