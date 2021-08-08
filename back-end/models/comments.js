const mongoose=require('mongoose');
const User=require('./models/users');
const Post=require('./models/posts');
var CommentSchema=new mongoose.Schema({
     text:{type:String,required:true},
     Commentedby:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
     createdAt: {type: Date, default: Date.now},
     Commentedon:{type:mongoose.Schema.Types.ObjectId,ref:'Post',required:true}
 })

 const Comment=mongoose.model('Comment',CommentSchema);
 module.exports=Comment;
 