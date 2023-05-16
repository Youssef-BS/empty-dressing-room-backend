import mongoose from "mongoose";

const msgSchema = new mongoose.Schema({
    content:{
        type : String , 
        required:true
       },
    },
    { timestamps: true }
    )
export const Msg = mongoose.model("Msg" , msgSchema);