import { Produit } from "../models/produits.js";
import { User } from "../models/users.js";
import { Payment } from "../models/Payment.js";

export const ajouterCommande = async (req , res)=>{
    try{
     const idUser = req.params.id;
     const idProduit = req.params.idproduit;  
     const produit = await Produit.findById(idProduit);
     const {ville , numRue , adresseLigne2 , codePoastal} = req.body;
    
    const newPayment = new Payment({ville, numRue, adresseLigne2, codePoastal}); 
    const payment = await newPayment.save();

    try{
    await User.findByIdAndUpdate(idUser , {
        $push : {payment : payment._id+" "+produit._id}
    })
    }catch(error){
        res.status(500).json({message: error.message});
    }

    res.status(200).json(payment);
     
     

    }catch(error){
        res.status(500).json({message: error.message});
    }
}