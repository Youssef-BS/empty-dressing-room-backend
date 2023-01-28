import { Produit } from "../models/produits.js";

export const addProduct= async (req , res)=>{
    const {desc , categorie , taille , photoProduit , marque , price} = req.body;
}