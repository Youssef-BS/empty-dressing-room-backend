import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    content:{
        type : String , 
        required:true
       }
    })
export const Msg = mongoose.model("Msg" , userSchema);