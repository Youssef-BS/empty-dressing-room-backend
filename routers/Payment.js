import  express from "express";
import { ajouterCommande } from "../controllers/Payment.js";



const router = express.Router();

router.route("/ajoutercommande/:id").post(ajouterCommande);

export default router;