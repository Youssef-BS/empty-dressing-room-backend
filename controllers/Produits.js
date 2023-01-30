import { Produit } from "../models/produits.js";
import {User} from "../models/users.js";
import cloudinary from "cloudinary";
import fs from "fs";

export const addProduct= async (req , res)=>{

   
    try{
        var  email =  Math.floor(Math.random() * 40251);
        const user = req.params.id;    
        const { title , taille  , marque , price , categorie , desc } = req.body;
        const photoProduit = req.files.photoProduit.tempFilePath;
        
        const mycloud =  await cloudinary.v2.uploader.upload(photoProduit , {
            folder : "todoApp"
        });
        
        fs.rmSync("./tmp" , {recursive : true});
  
    const newProduit = new Produit({
        email,
        title ,
        taille ,
        marque , 
        price,
        categorie,
        desc,
        photoProduit :{
            url: mycloud.secure_url,
          },
    })

    const saveProduct = await newProduit.save();

    
   
    
    try{
     await User.findByIdAndUpdate(user,{
            $push : {produit : saveProduct._id}
        })
        
    }catch(error){
        res.status(500).json({message : error.message})
    }
    res.status(200).json(saveProduct);
    }catch(error){
        res.status(500).json({message : error.message })
    }

}

export const getAllProduct = async (req , res) =>{
  
    try{
      
      const produits = await Produit.find();
      
      res.status(200).json(produits)

    }catch(error){
        res.status(500).json({message : error.message});
    }

}









