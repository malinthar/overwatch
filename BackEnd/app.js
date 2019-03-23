const express=require("express");
const path=require("path");
const bodyParser=require("body-parser");
const cors=require("cors");
const passport=require("passport");
const mongoose=require("mongoose");
const users=require('./routes/users');
const config=require('./config/database');

const app=express();
const port=3000;

//database connection

mongoose.connect(config.database);
mongoose.connection.on('connected',()=>{
    console.log("connected to database"+config.database);
});

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname,'public')));

//basic route
app.use('/users',users);
app.get('/',(req,res)=>{
    res.send("Invalid Endpoint");
});
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/index.html'));
});
//set static Folder

require('./config/passport')(passport);
app.listen(port,()=>{
    console.log("Server started on port"+port);
});
