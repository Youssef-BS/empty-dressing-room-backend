import { Produit } from "../models/produits.js";
import {User} from "../models/users.js";
import cloudinary from "cloudinary";
import fs from "fs";

export const addProduct= async (req , res)=>{

   try{
        var  email =  Math.floor(Math.random() * 40251);
        const user = req.params.id;    
        
        const { title , taille  , marque , price , categories , desc } = req.body;
        const photoProduit = req.files.photoProduit.tempFilePath;
        const categorie = categories + " " +email+Math.floor(Math.random() * 40251) ; 
        const mycloud =  await cloudinary.v2.uploader.upload(photoProduit , {
            folder : "todoApp"
        });
        
        fs.rmSync("./tmp" , {recursive : true});
  
    const newProduit = new Produit({
        email,
        title ,
        taille ,
        marque , 
        price,
        categorie,
        desc,
        photoProduit :{
            url: mycloud.secure_url,
          },
    })

    const saveProduct = await newProduit.save();

    
   
    
    try{
     await User.findByIdAndUpdate(user,{
            $push : {produit : saveProduct._id}
        })
        
    }catch(error){
        res.status(500).json({message : error.message})
    }
    res.status(200).json(saveProduct);
    }catch(error){
        res.status(500).json({message : error.message })
    }

}

export const getAllProduct = async (req , res) =>{
  
    try {
        const users = await User.find({}, { name: 1, photoP: 1, produit: 1 });
        const products = await Promise.all(
          users.map(user => {
            return Promise.all(
              user.produit.map(id => Produit.findById(id))
            ).then(userProducts => {
              return userProducts.map(product => ({
                name: user.name,
                photoP: user.photoP,
                produit: product
              }));
            });
          })
        );
        const flatProducts = products.reduce((acc, val) => acc.concat(val), []);
    
        for (let i = flatProducts.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [flatProducts[i], flatProducts[j]] = [flatProducts[j], flatProducts[i]];
        }
    
        res.status(200).json(flatProducts);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    


}

export const getProductUser = async(req , res) =>{

 try{
        const userId = req.params.id;
        const user = await User.findById(userId);
        
        const list = await Promise.all(
            user.produit.map((produit) => {
              return Produit.findById(produit);
            }))
            res.status(200).json(list)

    }catch(error){
        res.status(500).json({message : error.message})
    }
}

export const getProductMen = async (req , res)=>{
  try {
    const users = await User.find({}, { name: 1, photoP: 1, produit: 1 , categorie:1});
    const products = await Promise.all(
      users.map(user => {
        return Promise.all(
          user.produit.map(id => Produit.findById(id))
        ).then(userProducts => {
          return userProducts.map(product => ({
            name: user.name,
            photoP: user.photoP,
            produit: product,
            categorie : product.categorie.split(" ")[0],
          
          }));
        });
      })
    );
    const flatProducts = products.reduce((acc, val) => acc.concat(val), []);
    const filteredProducts = flatProducts.filter(product => product.categorie === "hommes");

    for (let i = filteredProducts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filteredProducts[i], filteredProducts[j]] = [filteredProducts[j], filteredProducts[i]];
    }
    
    res.status(200).json(filteredProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}

export const getProductWomen = async (req , res)=>{
  try {
    const users = await User.find({}, { name: 1, photoP: 1, produit: 1 , categorie:1});
    const products = await Promise.all(
      users.map(user => {
        return Promise.all(
          user.produit.map(id => Produit.findById(id))
        ).then(userProducts => {
          return userProducts.map(product => ({
            name: user.name,
            photoP: user.photoP,
            produit: product,
            categorie : product.categorie.split(" ")[0],
          
          }));
        });
      })
    );
    const flatProducts = products.reduce((acc, val) => acc.concat(val), []);
    const filteredProducts = flatProducts.filter(product => product.categorie === "femmes");

    for (let i = filteredProducts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filteredProducts[i], filteredProducts[j]] = [filteredProducts[j], filteredProducts[i]];
    }
    
    res.status(200).json(filteredProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}

export const getProductKids = async (req , res)=>{
  try {
    const users = await User.find({}, { name: 1, photoP: 1, produit: 1 , categorie:1});
    const products = await Promise.all(
      users.map(user => {
        return Promise.all(
          user.produit.map(id => Produit.findById(id))
        ).then(userProducts => {
          return userProducts.map(product => ({
            name: user.name,
            photoP: user.photoP,
            produit: product,
            categorie : product.categorie.split(" ")[0],
          
          }));
        });
      })
    );
    const flatProducts = products.reduce((acc, val) => acc.concat(val), []);
    const filteredProducts = flatProducts.filter(product => product.categorie === "enfants");

    for (let i = filteredProducts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filteredProducts[i], filteredProducts[j]] = [filteredProducts[j], filteredProducts[i]];
    }
    
    res.status(200).json(filteredProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}

export const getProductElectronique = async (req , res)=>{
  try {
    const users = await User.find({}, { name: 1, photoP: 1, produit: 1 , categorie:1});
    const products = await Promise.all(
      users.map(user => {
        return Promise.all(
          user.produit.map(id => Produit.findById(id))
        ).then(userProducts => {
          return userProducts.map(product => ({
            name: user.name,
            photoP: user.photoP,
            produit: product,
            categorie : product.categorie.split(" ")[0],
          
          }));
        });
      })
    );
    const flatProducts = products.reduce((acc, val) => acc.concat(val), []);
    const filteredProducts = flatProducts.filter(product => product.categorie === "electroniques");

    for (let i = filteredProducts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filteredProducts[i], filteredProducts[j]] = [filteredProducts[j], filteredProducts[i]];
    }
    
    res.status(200).json(filteredProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}


export const getProductHome = async (req , res)=>{
  try {
    const users = await User.find({}, { name: 1, photoP: 1, produit: 1 , categorie:1});
    const products = await Promise.all(
      users.map(user => {
        return Promise.all(
          user.produit.map(id => Produit.findById(id))
        ).then(userProducts => {
          return userProducts.map(product => ({
            name: user.name,
            photoP: user.photoP,
            produit: product,
            categorie : product.categorie.split(" ")[0],
          
          }));
        });
      })
    );
    const flatProducts = products.reduce((acc, val) => acc.concat(val), []);
    const filteredProducts = flatProducts.filter(product => product.categorie === "maison");

    for (let i = filteredProducts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filteredProducts[i], filteredProducts[j]] = [filteredProducts[j], filteredProducts[i]];
    }
    
    res.status(200).json(filteredProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}
export const getProductAnimaux = async (req , res)=>{
  try {
    const users = await User.find({}, { name: 1, photoP: 1, produit: 1 , categorie:1});
    const products = await Promise.all(
      users.map(user => {
        return Promise.all(
          user.produit.map(id => Produit.findById(id))
        ).then(userProducts => {
          return userProducts.map(product => ({
            name: user.name,
            photoP: user.photoP,
            produit: product,
            categorie : product.categorie.split(" ")[0],
          
          }));
        });
      })
    );
    const flatProducts = products.reduce((acc, val) => acc.concat(val), []);
    const filteredProducts = flatProducts.filter(product => product.categorie === "animaux");

    for (let i = filteredProducts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filteredProducts[i], filteredProducts[j]] = [filteredProducts[j], filteredProducts[i]];
    }
    
    res.status(200).json(filteredProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}


export const selectProduct = async (req , res) =>{
  try{
    const idProduct = req.params.idproduct;
   
    const user = await User.find()

 for(let i = 0 ; i<user.length ; i++){
      for(let j = 0 ; j<user[i].produit.length ; j++){
        if(user[i].produit[j]==idProduct){
          const product = await Produit.findById(user[i].produit[j])
          res.status(200).json({product,data:user[i]})
        }
      }
    }
 
  }catch(error){
    res.status(500).json({message : error.message})
  }
}


export const myProduits =async (req , res) =>{
  try{
  const Me =  req.params.id ; 
  const product = req.params.idproduct;
 
  const user = await User.findById(Me);
  for(let i =0 ; i<user.produit.length ; i++){
   if(user.produit[i]===product){
    res.status(200).json({message : true})
   }else {
    res.status(200).json({message : false})
   }
  }
}catch(error){
  res.status(500).json({message : error.message})
}

}











