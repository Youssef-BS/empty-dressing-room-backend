import { Produit } from "../models/produits.js";
import { User } from "../models/users.js";
import { Payment } from "../models/Payment.js";

export const ajouterCommandePoints = async (req , res)=>{
    try{
     const idClient = req.params.idclient;
     const idVandeur = req.params.idvendeur;
     const idProduit = req.params.idproduit;  
    const vendeur = await User.findById(idVandeur);
    const client = await User.findById(idClient);
    const produit = await Produit.findById(idProduit);

    if(client.points>=produit.price){
     
    const {ville , numRue , adresseLigne2 , codePoastal} = req.body;
    
    const newPayment = new Payment({ville, numRue, adresseLigne2, codePoastal}); 
    const payment = await newPayment.save();
    await User.findByIdAndUpdate(idClient , {
        points : client.points-produit.price
      },
      {new : true}
       )
       await User.findByIdAndUpdate(idVandeur , {
        points : vendeur.points + produit.price ,
      },
      {new : true}
      )
      await Produit.findByIdAndUpdate(idProduit , {
        vende : true ,
      },
      {new : true}
      )
    try{
    await User.findByIdAndUpdate(idClient , {
        $push : {payment : payment._id+" "+produit._id}
    })
    }catch(error){
        res.status(500).json({message: error.message});
    }

}
    res.status(200).json({message : "success"});
     
     

    }catch(error){
        res.status(500).json({message: error.message});
    }
}