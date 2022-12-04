var express = require('express');
var router = express.Router();
const User = require("../db/User")


router.route("/login").post(async (req, res) =>{
    try{
        const{username,password} = req.body;
        if(!username){
          return res.status(400).json({error : "Plz fill the field properly"});
        }
    
        const userLogin= await User.findOne({username : username});
        
    
        if(userLogin){
          if(password != userLogin.password){
            return res.status(400).json({error : "invalid pass or email"});
          }
          else{
            return res.status(200).json({message : "Login Success", user: username});
          }    
        }else{
          return res.status(400).json({error : "Invalid credentials"});
        }
      
      }catch(err){
        console.log(err);
      }
    

})



router.route("/signup").post(async(req,res)=>{
    const{name, username, password}= req.body; 
    console.log(req.body.username);
    console.log(req.body.password);
    if(!name|| !username || !password){
      return res.status(422).json({error : "Plz fill the field properly"});
    }
    else{
    try{
      const userExits = await User.findOne({username: username});
      if(userExits){
        console.log("User Exits");
        return res.status(422).json({err:" User Exists"});
      }else{
        const user = new User({name,username,password});
        const userRegister =  await user.save();
        console.log('${user} user Register success');
        console.log(userRegister);
        res.status(201).json({ message:"user registerd successfully" });
    
      }
  
    }catch(err){
      console.log(err);
    }
    }
});

module.exports = router