import  express from "express";
import { addProduct } from "../controllers/Produits.js";

const router = express.Router();

router.route("/addproduct").post(addProduct);


export default router;