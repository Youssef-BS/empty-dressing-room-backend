import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name :{
        type : String , 
        required:true
       },
       email : {
        type : String , 
        required : true , 
        unique : true
       },
       password : {
         type : String,
         required: true,
         minlength: [8 , "password must be 8 caracteres long"]
       },
       
    photoP : {
        url : String 
    },
    produits : [ 
        {
      titre: String,
      description : String,
      categories : String,
      taille : String,
      marque : String,
      prix : Number,
      createdAt : Date,
        photoProduit : {
        public_id:String,
        url : String, 
    }}],
    isAdmin : {
        type : Boolean,
        default : false,
    }
      
})


userSchema.methods.getJWTToken = function () {
    return  jwt.sign({
        _id : this._id,
        admin : this.isAdmin,
  },"YSF",{expiresIn : "5d"});
  };

export const User = mongoose.model("User" , userSchema);