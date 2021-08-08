const mongoose=require('mongoose');
var User=require("./users.js");
var PostSchema=new mongoose.Schema({
     title:{type:String,required:true},
     body:{type:String,required:true},
     postedby:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
     createdAt: {type: Date, default: Date.now},
     likedby:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}]
 })

 const post=mongoose.model('Post',PostSchema);
 module.exports=post;
 