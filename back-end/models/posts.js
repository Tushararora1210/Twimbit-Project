const mongoose=require('mongoose');
const User=require('./models/users');
var PostSchema=new mongoose.Schema({
     title:{type:String,required:true},
     body:{type:String,required:true},
     postedby:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
     createdAt: {type: Date, default: Date.now},
     likedby:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}]
 })

 const Post=mongoose.model('Post',PostSchema);
 module.exports=Post;
 