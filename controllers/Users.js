import { User } from "../models/users.js";
import CryptoJS from "crypto-js"
import { sendToken } from "../middleware/sendToken.js";
import cloudinary from "cloudinary";
import fs from "fs";


//register User
export const register = async (req , res) =>{
  try {
    const {name,email,password} = req.body;
    const photoP = req.files.photoP.tempFilePath;
   
   
    const user = await User.findOne({email}) ;
    if(user) res.status(400).json({message : "Email Deja existe"});

    const mycloud =  await cloudinary.v2.uploader.upload(photoP , {
      folder : "todoApp"
  });
  
  fs.rmSync("./tmp" , {recursive : true});
    
    const newUser = new User({
        name,
        email,
        photoP :{
          url: mycloud.secure_url,
        },
        
        password :  CryptoJS.AES.encrypt(
          password,
          "aazzee"
        ).toString(),
      });    
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
      } catch (error) {
        res.status(500).json({message:error.message});
      }
}

// app.post("/api/upload", upload.single("file"), (req, res) => {
//   const file = req.file;
//   res.status(200).json(file.filename);
// });

//login User with token and cookies

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

  const id = req.params.id;
try{

await User.findByIdAndDelete(id);
res.status(200).json({message : "utilisateur supprimer"});



}catch(error){
  res.status(500).json({message : error.message});
}
}

// get user 

export const getUser = async (req , res)=>{
  const id= req.params.id;

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

//add user product

export const addProduct = async (req , res)=>{
  try{

    const {titre , description , categories , taille , marque , prix ,createdAt ,  photoProduit} = req.body;
    const user = await User.findById(req.user._id);

    user.produits.push({
      titre , 
      description,
      categories,
      taille,
      marque,
      prix,
      createdAt: new Date(Date.now()),
      photoProduit,
  })

  await user.save();

  res.status(200).json({message : "produit added successfully"});

}catch(error){
    res.status(500).json({message : error.message});
  }
}

// get user Product 

export const getUserProduct = async (req , res) =>{
try {
    const userProduits = await User.findById(req.params.id);
    res.status(200).json(userProduits.produits);
  } catch (error) {
    res.status(500).json({message : error.message});
  }
}





