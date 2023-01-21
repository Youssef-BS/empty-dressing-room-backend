import { User } from "../models/users.js";
import CryptoJS from "crypto-js"
import jwt from "jsonwebtoken";


//register
export const register = async (req , res) =>{
    const {name,email,password} = req.body;
    let user = await User.findOne({email}) ;
    if(user) res.status(400).json({message : "Email Deja existe"});
    
    const newUser = new User({
        name,
        email,
        password :  CryptoJS.AES.encrypt(
          password,
          "aazzee"
        ).toString(),
      });
    
      try {
     
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
      } catch (err) {
        res.status(500).json(err);
      }
}


//login
export const login = async (req , res) =>{
  try{
  const {email} = req.body; 

  let user = await User.findOne({email});
  if(!user) res.status(400).json({message : 'password ou email errone'});
  
  const hashedPassword = CryptoJS.AES.decrypt(
    user.password,
    "aazzee"
  );
  const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

  OriginalPassword !== req.body.password &&
    res.status(401).json("Wrong credentials!");


    const accessToken = jwt.sign({
      id : user._id,
      name : user.name,
      admin : user.isAdmin,
},"YSF",{expiresIn : "5d"});

    const {password , ...autre} = user._doc;
    res.status(200).json({...autre , accessToken});
  
  } catch(error){
    res.status(500).json({message : error.message});
  }
}

