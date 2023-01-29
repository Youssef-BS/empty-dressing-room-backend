import { Produit } from "../models/produits.js";
import {User} from "../models/users.js"

export const addProduct= async (req , res)=>{
    try{
    const user = req.params.id;    
    const {desc , categorie , taille  , marque , price} = req.body;
    const newProduit = new Produit({
        desc ,
        categorie ,
        taille ,
        marque , 
        price
    })

    const saveProduct = await newProduit.save();
    
    try{
     
        await User.findByIdAndUpdate(user ,{
            $push : {produit : saveProduct._id}
        })
    }catch(error){
        res.status(500).json({message : error.message})
    }
    res.status(200).json(saveProduct);
    }catch(error){
        res.status(500).json({message : error.message})
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









