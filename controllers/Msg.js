import { User } from "../models/users.js";
import {Msg} from "../models/msg.js";
import { Produit } from "../models/produits.js";

export const addMessage = async (req, res) => {
    const content = req.body;
    const user = req.params.id;
    const to = req.params.idtouser;
    const product = req.params.idproduct;
  
    try {
      const productFind = await Produit.findById(product);
  
      const NewMessage = new Msg(content);
      const messageEnvoyer = await NewMessage.save();
      res.status(200).json(messageEnvoyer);
  
      try {
        await User.findByIdAndUpdate(user, {
          $push: { msg: messageEnvoyer._id },
        });
        await User.findByIdAndUpdate(to, {
          $push: { msg: messageEnvoyer._id },
        });
  
        const index = productFind.msgUser.indexOf(user);
        if (index === -1) {
          await Produit.findByIdAndUpdate(product, {
            $push: { msgUser: user },
          });
        }
  
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  


export const getConversation = async (req , res)=>{
    const user = req.params.id;
    const to = req.params.idtouser;
     
    try {
     
        const userMessage =await User.findById(user);
        const toUserMessage = await User.findById(to);

      const  list1 = userMessage.msg;
      const list2 = toUserMessage.msg ;
    //   res.status(200).json({list1 , list2})
   const list3 = []


        for(let i=0 ; i<list1.length ; i++){
        for(let j= 0 ; j<list2.length ; j++){
            if(list1[i]===list2[j]){
                const conversation = await Msg.findById(list1[i])
                list3.push(conversation.content)
                // res.status(500).json(conversation.content)
                
            }
        }
        }
        res.status(200).json(list3)
        
        }catch(error){
        res.status(500).json({message : error.message})
    }
}

export const Notification = async (req, res) => {
    const id = req.params.id;
    const me = await User.findById(id);
    const listMessage = [];
    const listProduit = [];
    const userSendMe = [];
    const finalResult = []
  
    listMessage.push(me.msg);
    for (let i = 0; i < me.produit.length; i++) {
      const produit = await Produit.findById(me.produit[i]);
      if (produit) {
        listProduit.push(produit);
        for (let j = 0; j < produit.msgUser.length; j++) {
          const user = await User.findById(produit.msgUser[j]);
          if (user) {
            userSendMe.push(user);
          }
        }
      }
    }

    for (let i = 0; i < userSendMe.msg.length; i++) {
        for (let j = 0; j < userSendMe.msg.length; j++) {
            if (me.msg.includes(userSendMe[i].msg[j])) {
                finalResult.push(await Msg.findById(userSendMe[i].msg[j]))
            }
        }
    }
  
    res.status(200).json(finalResult);
}