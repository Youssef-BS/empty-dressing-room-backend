import { User } from "../models/users.js";
import {Msg} from "../models/msg.js";

export const addMessage = async(req , res)=>{
    const content = req.body;
    const user = req.params.id;
    const to = req.params.idtouser;
    
try{
    
    const NewMessage = new Msg(
        content,
    )
    const messageEnvoyer = await NewMessage.save();
    res.status(200).json(messageEnvoyer)
    

    try{
    await User.findByIdAndUpdate(user , {
        $push : {msg : messageEnvoyer._id}
    })
    await User.findByIdAndUpdate(to , {
        $push : {msg : messageEnvoyer._id}
    })
   
    }catch(error){
        res.status(500).json({message : error.message})
    }
}catch(error){
    res.status(500).json({message : error.message})
}

}

export const getConversation = async (req , res)=>{
    const user = req.params.id;
    const to = req.params.idtouser;
     
    try {
     
        const userMessage =await User.findById(user);
        const toUserMessage = await User.findById(to);

      let  list1 = userMessage.msg;
      let list2 = toUserMessage.msg ;
    //   res.status(200).json({list1 , list2})



        for(let i=0 ; i<list1.length ; i++){
        for(let j= 0 ; j<list2.length ; j++){
          
            if(list1[i]===list2[j]){
                const conversation =await Msg.findById(list1[i])
                res.status(200).json(conversation.content)
            }
            
        }
        }
        
        }catch(error){
        res.status(500).json({message : error.message})
    }
}
