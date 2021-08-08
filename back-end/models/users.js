const mongoose=require('mongoose');

function ValidateEmail(mail) 
{
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
  {
    return (true)
  }
    return (false)
}

function issharepostauthenticated()
{
    if(this.authdetails=="sharepost")
    {
        return true;
    }
    return false;
}

 var UserSchema=new mongoose.Schema({
     name:{type:String,required:true,trim:true},
     username:{type:String,required:true,unique:true},
     authdetails:{type:String,required:true,enum:["Github","Twitter","Apple","sharepost"]},
     image:{type:String,default:""},
     email:{type:String,unique:true,lowercase:true,
     validate:[ValidateEmail,'Please fill a valid email address'],
     required:issharepostauthenticated},
     password:{type:String,required:issharepostauthenticated},
     bio:[String],
     followers:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
     following:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
 })

 const User=mongoose.model('User',UserSchema);
 module.exports=User;
 