import  express from "express";
import { addProduct , getAllProduct } from "../controllers/Produits.js";

const router = express.Router();

router.route("/addproduct/:id").post(addProduct);
router.route("/").get(getAllProduct);

export default router;