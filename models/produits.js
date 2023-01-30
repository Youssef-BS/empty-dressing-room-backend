import mongoose from "mongoose";

const ProduitSchema = new mongoose.Schema({
    
    desc :{
        type : String , 
        
       },
       taille : {
         type : String,
       },
       categorieItem : {
       type : String ,
       },
       marque : {
        type : String , 
        unique : false,
       },
       price : {
        type : Number,
        
       },
       etat : {
        type : Boolean,
        default : false,
    },
    email: {
      type: String,
      sparse: true,
      unique : false,
    }
         

},
{ timestamps: true }
)

export const Produit = mongoose.model("Produit" , ProduitSchema);