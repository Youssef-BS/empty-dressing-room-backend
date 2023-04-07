import mongoose from "mongoose";
const ProduitSchema = new mongoose.Schema(
  {
    email : {
      type : Number , 
      default :1,
       
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    categorie: {
      type: String,
      required: true,
      index : false,
    },
    desc: {
      type: String,
      required: true,
    },
    photoProduit : {
      url : String 
  },
  taille : {
    type : String , 
    required : true,
  },
  marque : {
    type :String , 
    required : true , 
  },
  msgUser : {
    type : [String]
  },
  isFetch : {
    type : Boolean ,
    default : false,
  },
 
  typeP : {
    type : String ,
  } ,
  
  points : {
    type : Number,
  }
   
  },

 
  { timestamps: true }
);

export const Produit = mongoose.model("Produit" , ProduitSchema);