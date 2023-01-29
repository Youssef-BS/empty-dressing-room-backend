import  express from "express";
import { addProduct } from "../controllers/Produits.js";

const router = express.Router();

router.route("/addproduct/:id").post(addProduct);


export default router;