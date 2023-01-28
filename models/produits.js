import mongoose from "mongoose";

const ProduitSchema = new mongoose.Schema({
    
    desc :{
        type : String , 
        required:true
       },
       categorie : {
        type : String , 
        required : true , 
       },
       taille : {
         type : String,
         required: true,
         
       },
       marque : {
        type : String , 
        required : true,
       },
       price : {
        type : Number,
        required : true,
       },
       
  


    etat : {
        type : Boolean,
        default : false,
    }
         

},
{ timestamps: true }
)

export const Produit = mongoose.model("Produit" , ProduitSchema);