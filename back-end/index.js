const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const cookieParser = require("cookie-parser");
const app=express();
const port=process.env.PORT||3300;
const userrouter=require('./routes/users');
const postrouter=require('./routes/posts');
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


app.use(userrouter);
app.use(postrouter);
const password=process.env.password;
const db=`mongodb+srv://Tushar:${password}@cluster0.iirxd.mongodb.net/sharepost?retryWrites=true&w=majority`;

mongoose.connect(db,{useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false})
.then(()=>{
    console.log("Connection Succesfully Established")
})
.catch((err)=>{
    console.error(err);
})

app.get('/',(req,res)=>{
    res.send("hi");
})
app.listen(port,(err)=>{
if(err)
{
    console.log(error);
}
else
{
    console.log("Server started working Successfully");
}
})