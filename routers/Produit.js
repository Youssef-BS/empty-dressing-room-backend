import  express from "express";
import { addProduct , getAllProduct , getProductUser , getProductMen ,getProductWomen,getProductKids , getProductElectronique , getProductHome } from "../controllers/Produits.js";

const router = express.Router();

router.route("/addproduct/:id").post(addProduct);
router.route("/").get(getAllProduct);
router.route("/:id").get(getProductUser);
router.route("/men/clother").get(getProductMen)
router.route("/women/clother").get(getProductWomen)
router.route("/kids/clother").get(getProductKids)
router.route("/electronique/accesoire").get(getProductElectronique)
router.route("/home/accesoire").get(getProductHome)


export default router;