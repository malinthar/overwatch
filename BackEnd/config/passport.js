
    const JwtStrategy=require('passport-jwt').Strategy;
    const ExtractJwt=require('passport-jwt').ExtractJwt;
    const User=require('../models/user');
    const config=require('../config/database');


module.exports=function(passport){
    let opts={};
   
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = config.secret;
    console.log("Yes");
    passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
    console.log("IN playload");
      console.log(jwt_payload); 
       User.getUserById(jwt_payload.data._id,(err,user)=>{
         if(err){
             console.log(err);
             return done(err,false);
         }
         if(user){
             console.log("got user");
             console.log(user);
             return done(null,user);
         }else{
             return done(null,false);
         }
       });
    })); 
}