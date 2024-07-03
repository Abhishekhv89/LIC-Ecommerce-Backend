const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const authRouter =require("./routes/authRoutes");
const cookieParser = require('cookie-parser'); 
const PORT = 3001
const app = express();


//midleware
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({extended:false}))

//database
mongoose.connect("mongodb://127.0.0.1:27017/lic-ecommerce")
.then(()=>{
    console.log("connected to Database successfully")
})
.catch(err => console.log(err));




//routing
app.use('/',authRouter);





app.listen(PORT,()=>{
    console.log(`server is listening at port : ${PORT}`);
})

