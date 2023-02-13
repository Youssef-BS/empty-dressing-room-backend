import { User } from "../models/users.js";
import {Msg} from "../models/msg.js";

export const addMessage = async(req , res)=>{
    const content = req.body;
    const user = req.params.id;
try{
    
    const NewMessage = new Msg(
        content,
    )
    const messageEnvoyer = await NewMessage.save();
    res.status(200).json(messageEnvoyer)
    }catch(error){
        res.status(500).json({message : error.message})
    }

    try{
    await User.findByIdAndUpdate(user , {
        $push :{msg : messageEnvoyer._id}
    })
    }catch(error){
        res.status(500).json({message : error.message})
    }

}