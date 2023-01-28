import { Produit } from "../models/produits.js";

export const addProduct= async (req , res)=>{
    try{
    const {desc , categorie , taille  , marque , price} = req.body;
    const newProduit = new Produit({
        desc ,
        categorie ,
        taille ,
        marque , 
        price
    })

    const saveProduct = await newProduit.save();
    res.status(200).json(saveProduct);

    }catch(error){
        res.status(500).json({message : error.message})
    }

}

