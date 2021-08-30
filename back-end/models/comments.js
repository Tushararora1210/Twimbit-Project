const mongoose=require('mongoose');
var User=require('./users');
const Post=require('./posts');
var CommentSchema=new mongoose.Schema({
     text:{type:String,required:true},
     Commentedby:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
     createdAt: {type: Date, default: Date.now},
     Commentedon:{type:mongoose.Schema.Types.ObjectId,ref:'Post',required:true}
 })

 const Comment=mongoose.model('Comment',CommentSchema);
 module.exports=Comment;
 