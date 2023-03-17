import  express from "express";
import { addProduct ,
     getAllProduct ,
     getProductUser ,
     getProductMen ,
     getProductWomen,
     getProductKids ,
     getProductElectronique , 
     getProductHome ,
     getProductAnimaux,
     selectProduct,
     myProduits,
     deleteProduit,
     updateProduit,
     getAllproduitisNotFetched,
     AcceptProduit,
     getallProductTrue,
     deleteProduct,
     
    } from "../controllers/Produits.js";
    import { isAuthenticated } from "../middleware/verifyToken.js";


const router = express.Router();

 router.route("/addproduct/:id").post(addProduct);
 router.route("/").get(getAllProduct);
 router.route("/:id").get(getProductUser);
 router.route("/men/clother").get(getProductMen);
 router.route("/women/clother").get(getProductWomen);
 router.route("/kids/clother").get(getProductKids);
 router.route("/electronique/accesoire").get(getProductElectronique);
 router.route("/home/accesoire").get(getProductHome);
 router.route("/animaux/accesoire").get(getProductAnimaux);
 router.route("/select/:idproduct").get(selectProduct);
 router.route("/myproduit/test/:id/:idproduct").get(myProduits);
//  router.route("/supprimer/:idproduct").delete(isAuthenticated , deleteProduit);
 router.route("/update/:idproduct").put(isAuthenticated , updateProduit);
 router.route("/notfetched/select").get(getAllproduitisNotFetched)
 router.route("/acceptproduct/:idproduct").put(AcceptProduit);
 router.route("/fetch/select").get(getallProductTrue);
 router.route("/deleteproduct/:iduser/:idproduct").delete(deleteProduct);


export default router;