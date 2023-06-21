import { User } from "../models/users.js";
import {Produit} from "../models/produits.js";
import CryptoJS from "crypto-js"
import { sendToken } from "../middleware/sendToken.js";
import cloudinary from "cloudinary";
import { sendMail } from "../middleware/sendMail.js";
import fs from "fs";



//register User
export const register = async (req , res) =>{
  try {
    const {name,email,password} = req.body;
    const photoP = req.files.photoP.tempFilePath; //cloudinary
   
   
    let user = await User.findOne({email}) ;
    if(user){
      return res
      .status(400)
      .json({
          success : false ,
          message : "User already Exists"});
  }
    const otp = Math.floor(Math.random() * 100000); // code for verify mail
    const mycloud =  await cloudinary.v2.uploader.upload(photoP , {
      folder : "todoApp"
  });
  
  fs.rmSync("./tmp" , {recursive : true}); // remove temporary
    
   user = await User.create({
        name,
        email,
        photoP :{
          url: mycloud.secure_url,
        },
        password :  CryptoJS.AES.encrypt(
          password,
          "aazzee"
        ).toString(),
        otp,
        otp_expiry: new Date(Date.now() + process.env.OTP_EXPIRE * 60 * 1000),
        
      });
      await sendMail(email, "Verify your account", `Your OTP is ${otp}`);   
      sendToken(
        res ,
        user ,
        201 ,
        "OTP sent to your email , Please verify your Account") 
        // const savedUser = await newUser.save();
        // res.status(201).json(savedUser);
      } catch (error) {
        res.status(500).json({message:error.message});
      }
}

// app.post("/api/upload", upload.single("file"), (req, res) => {
//   const file = req.file;
//   res.status(200).json(file.filename);
// });

//login User with token and cookies
export const verify = async (req , res)=>{
  try{
 const otp = Number(req.body.otp);

 const user = await User.findById(req.user._id);

 if(user.otp != otp || user.otp_expiry < Date.now()){
 return res.status(400).json({success : false , message  : "Invalide OTP Or has been expired"})
 }
 
 user.verified = true;
 user.otp = null ;
 user.otp_expiry = null;

 await user.save();
 sendToken(res , user , 200 , "Account verified");

  }catch(error){
  res.status(500).json({success : false , message : error.message})
  }
}



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


    sendToken(res, user, 200, "Login Successful");
   
  
  }catch(error){
    res.status(500).json({message : error.message});
  }
}
// login admin



//logout 

export const logout = (req , res) =>{
  res.clearCookie("token" , {
    secure : true , 
    sameSite : "none"}).status(200).json({message : "logout"});
}

//find all users

export const getUsres =  async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({message : error.message});
  }
};


// delete users 

export const deleteUser  = async (req , res) =>{
   // admin

const id = req.params.id;  // id of the user
try{

await User.findByIdAndDelete(id);
res.status(200).json({message : "utilisateur supprimer"});



}catch(error){
res.status(500).json({message : error.message});
}

}

// get user 

export const getUser = async (req , res)=>{
  const id= req.params.id; // id of the user

  try{
  const user = await User.findById(id);
  res.status(200).json(user);
  }catch(error){
    res.status(500).json({message : error.message});
  }
}

//update user 

export const updateUser = async(req , res)=>{
  try{
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);

  }catch(error){
    res.status(500).json({message : error.message});
  }
}


// get profile with product

export const getPprofile = async(req , res)=>{
  try{
   
    const product = [];
    const id = req.params.id;
    const Profile = await User.findById(id); 
    for(let i=0; i < Profile.produit.length ; i++){
      const productS = await Produit.findById(Profile.produit[i]);
      product.push(productS);
    }
    res.status(200).json({name : Profile.name, email : Profile.email , photo : Profile.photoP , stars : Profile.stars ,product : product});
  }catch(error){
    res.status(500).json({message : error.message});
  }
}


// get all profile with product 
export const getAllProfileWproduct = async (req, res) => {
  try {
    const users = await User.find();

    const productsByUser = [];

    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const products = [];

      for (let j = 0; j < user.produit.length; j++) {
        const product = await Produit.findById(user.produit[j]);
        products.push(product);
      }

      let s = 0;
      for (let k = 0; k < user.stars.length; k++) {
        s = s + parseFloat(user.stars[k].split(" ")[1]);
      }

      const moyenne = user.stars.length !== 0 ? s / user.stars.length : 0;

      productsByUser.push({ user, products, moyenne });
    }

    res.status(200).json(productsByUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const addStars = async (req, res) => {
  try {
    const id = req.params.id;
    const me = req.params.me;
    const star  = req.body.star;
    const user = await User.findById(id);

    let updated = false;

    for (let i = 0; i < user.stars.length; i++) {
      const entry = user.stars[i].split(" ");
      if (entry[0] === me) {
        entry[1] = star.toString();
        user.stars[i] = entry.join(" ");
        updated = true;
        break;
      }
    }

    if (!updated) {
      user.stars.push(me + " " + star.toString());
    }

    await user.save();

    res.status(200).json("good"+star);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};








