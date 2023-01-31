import  express from "express";
import { addProduct , getAllProduct , getProductUser } from "../controllers/Produits.js";

const router = express.Router();

router.route("/addproduct/:id").post(addProduct);
router.route("/").get(getAllProduct);
router.route("/:id").get(getProductUser);


export default router;