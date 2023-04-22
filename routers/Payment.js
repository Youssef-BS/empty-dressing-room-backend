import  express from "express";
import { ajouterCommandePoints , getMyCommande } from "../controllers/Payment.js";



const router = express.Router();

router.route("/ajoutercommande/:idclient/:idvendeur/:idproduit").post(ajouterCommandePoints);
router.route("/getmycommande/:id").get(getMyCommande);

export default router;