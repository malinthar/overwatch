const express=require("express");
const router=express.Router();
const passport=require('passport');
const jwt=require('jsonwebtoken');
const config=require('../config/database');
const User=require('../models/user');
const JwtStrategy=require('passport-jwt').Strategy;
const ExtractJwt=require('passport-jwt').ExtractJwt;


//Register
router.post('/register',(req,res,next)=>{
  console.log("in backend");
  let newUser=new User({
      name:req.body.name,
      email:req.body.email,
      username:req.body.username,
      password:req.body.password 
  });
  User.addUser(newUser,(err,user)=>{ 
      if(err){
          res.json({success:false,msg:"Failed to register user"});
      }else{
          console.log("fine");
          res.json({success:true,msg:"User Successfully Registred"});
      }
  });
}
);

//Authenticate
router.post('/authenticate',(req,res,next)=>{
    const username=req.body.username;
    const password=req.body.password;
    User.getUserByUsername(username,(err,user)=>{
        if(err) throw err;
        if(!user){
            return res.json({sucess:false,msg:"User not found"});
        }
        
    
       User.comparePassword(password,user.password,(err,isMatch)=>{
        if(err) throw err;
        if(isMatch){
            console.log(user);
        const token=jwt.sign({data:user},config.secret,{
          expiresIn:6000000000
        });
       console.log(token);
        res.json({
            success:true,
            token:"JWT "+token,
            user:{
              id:user._id,
              name:user.name,
              username:user.username,
              email:user.email
            }
        });
        }else{
            return res.json({success:false,msg:"Incorrect Password"});
        }
    })
     
   });
});


//Profile
router.get('/profile',passport.authenticate('jwt',{session:false}),(req,res)=>{
    console.log("got request");
    res.json({user:req.user});
  }
);



module.exports=router;
