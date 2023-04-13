import { Produit } from "../models/produits.js";
import {User} from "../models/users.js";
import cloudinary from "cloudinary";
import fs from "fs";

export const addProduct= async (req , res)=>{

   try{
        var  email =  Math.floor(Math.random() * 40251);
        const user = req.params.id;    
        
        const { title , taille  , marque , price , categories , desc , typeP} = req.body;
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
        typeP,
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

export const getAllProduct = async (req, res) => {
  try {
    const users = await User.find({}, { name: 1, photoP: 1, produit: 1 });
    const products = await Promise.all(
      users.map((user) => {
        return Promise.all(user.produit.map((id) => Produit.findById(id))).then(
          (userProducts) => {
            return userProducts
              .filter((product) => product.isFetch) // filter by isFetch
              .map((product) => ({
                name: user.name,
                photoP: user.photoP,
                produit: product,
              }));
          }
        );
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
};


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
    const users = await User.find({}, { name: 1, photoP: 1, produit: 1 , categorie:1 });
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


export const deleteProduit = async(req , res)=>{
  if(req.user.isAdmin){
    const idProduct = req.params.idproduct;
    try{
    await Produit.findByIdAndDelete(idProduct)
    res.status(200).json({message : "Produit supprimer"})
    }catch(error){
      res.status(500).json({message : error.message})
    }
  }
  else{
    res.status(500).json("you are not allowed")
  }
 
}

export const updateProduit = async(req , res)=>{
//  if(req.user.isAdmin){
const idproduct = req.params.idproduct ;
  try{
   const updateProduct = await Produit.findByIdAndUpdate(
    idproduct
    ,{
      $set : req.body
    },
    {new : true}
    );
    res.status(200).json(updateProduct)
  }catch(error){
    res.status(500).json({message : error.message})
  }
}
// else{
//   res.status(403).json({message : "you are not alowed"})
// }
// }

export const getAllproduitisNotFetched = async(req,res)=>{

  try{
    const notFetchedProducts = await Produit.find({ isFetch: false });
    res.status(200).json(notFetchedProducts)
  }catch(error){
    res.status(500).json({message : error.message})
  }

}

export const AcceptProduit = async (req, res) => {
  try {
    const idProduct = req.params.idproduct;
    const accept = await Produit.findByIdAndUpdate(
      idProduct,
      { isFetch: true },
      { new: true } // To return the updated document
    );

    res.status(200).json(accept);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getallProductTrue = async(req , res)=>{
try{
const fetchProduct = await Produit.find({isFetch : true});
res.status(200).json(fetchProduct);
}catch(error){
  res.status(500).json({message : error.message})
}
}

//delete item 

export const deleteProduct = async (req, res) => {
  const idProduct = req.params.idproduct;
  const idUser = req.params.iduser;
  try {
    await Produit.findByIdAndDelete(idProduct);
    const user = await User.findById(idUser);
    user.produit = user.produit.filter((productId) => productId !== idProduct);
    await user.save();
    res.status(200).json("product deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deletethisProduct = async (req, res) => {
  const idProduct = req.params.idproduct;
  try {
    // Find the product by id and get its produit field
    const product = await Produit.findById(idProduct);
    const productId = product._id.toString();

    // Update all the users who have this product id in their produit array
    await User.updateMany(
      { produit: productId },
      { $pull: { produit: productId } }
    );

    // Delete the product
    await Produit.findByIdAndDelete(idProduct);

    res.status(200).json({ message: "product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteMyProduct = async (req, res) => {
  const idProduct = req.params.idproduct;
  const id = req.params.id;
  try {
    const product = await Produit.findById(idProduct);
    const productId = product._id.toString();
    const Me = await User.findById(id);
    let productIndex = -1;
    for (let i = 0; i < Me.produit.length; i++) {
      if (idProduct === Me.produit[i]) {
        productIndex = i;
        break;
      }
    }
    if (productIndex !== -1) {
      await Produit.findByIdAndDelete(idProduct);
      Me.produit.splice(productIndex, 1);
      await Me.save();
      res.status(200).json({ message: "Product deleted" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateMyProduct = async (req , res)=>{
  const id = req.params.id;
  const idProduct = req.params.idproduct;
try{
const Me = await User.findById(id);
let fetch = -1 ; 
for(let i =0 ; i<Me.produit.length ; i++){
  if(Me.produit[i] === idProduct){
    fetch = i ;
    break ;
  }
}
  if(fetch != -1){
  
      const updateProduct = await Produit.findByIdAndUpdate(
        idProduct
       ,{
         $set : req.body
       },
       {new : true}
       );
       res.status(200).json(updateProduct)
 
} else {
  res.status(404).json({message : "product not found"})
}
}catch(error){
  res.status(500).json({message : error.message})
}
}

// achter produit avec des points

export const acheterProduitPoints = async (req , res) =>{
  const idVandeur = req.params.idvendeur;
  const idClient = req.params.idclient;
  const idProduit = req.params.idproduit ;

  const vendeur = await User.findById(idVandeur);
  const client = await User.findById(idClient);
  const produit = await Produit.findById(idProduit);
  try{

if(client.points>=produit.price){

   await User.findByIdAndUpdate(idClient , {
    points : client.points-produit.price
  },
  {new : true}
   )
  
   await User.findByIdAndUpdate(idVandeur , {
    points : vendeur.points + produit.price ,
  },
  {new : true}
  )
  
  await Produit.findByIdAndUpdate(idProduit , {
    vende : true ,
  },
  {new : true}
  )
  
res.status(200).json({message :"vous avez acheter ce produit"})
}

else {
  res.status(200).json({message : "vous n'avais pas le prix pour ce produit"})
}

}catch(error){
  res.status(500).json({message : error.message})
}
}


//afficher les produit vendre

export const afficheProduitVendre = async (req , res)=>{
  try{
  
   const produitVendre = await Produit.find({vende : true})
   res.status(200).json(produitVendre)
      
  }catch(error){
    res.status(500).json({message : error.message})
  }
}
