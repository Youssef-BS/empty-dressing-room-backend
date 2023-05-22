import  express from "express";
import { addProduct ,
     getAllProduct ,
     getProductUser ,
     selectProduct,
     myProduits,
     updateProduit,
     getAllproduitisNotFetched,
     AcceptProduit,
     getallProductTrue,
     deleteProduct,
     deletethisProduct,
     deleteMyProduct,
     updateMyProduct,
     afficheProduitVendre,
     rechercher,
     filter
     
    } from "../controllers/Produits.js";
    import { isAuthenticated } from "../middleware/verifyToken.js";


const router = express.Router();

 router.route("/addproduct/:id").post(addProduct);
 router.route("/").get(getAllProduct);
 router.route("/:id").get(getProductUser);
 router.route("/select/:idproduct").get(selectProduct);
 router.route("/myproduit/test/:id/:idproduct").get(myProduits);
 router.route("/update/:idproduct").put(updateProduit);
 router.route("/notfetched/select").get(getAllproduitisNotFetched)
 router.route("/acceptproduct/:idproduct").put(AcceptProduit);
 router.route("/fetch/select").get(getallProductTrue);
 router.route("/deleteproduct/:iduser/:idproduct").delete(deleteProduct);
 router.route("/deletethisproduct/:idproduct").delete(deletethisProduct);
 router.route("/deletemyproduct/:id/:idproduct").delete(deleteMyProduct);
 router.route("/updatemyproduct/:id/:idproduct").put(updateMyProduct);
 router.route("/afficheproduitvende/vendre").get(afficheProduitVendre);
 router.route("/rechercherproduit/trouve").get(rechercher);
 router.route("/rechercherproduit/filter").get(filter);
 


export default router;