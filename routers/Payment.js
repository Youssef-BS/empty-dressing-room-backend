import  express from "express";
import { ajouterCommandePoints } from "../controllers/Payment.js";



const router = express.Router();

router.route("/ajoutercommande/:idclient/:idvendeur/:idproduit").post(ajouterCommandePoints);

export default router;