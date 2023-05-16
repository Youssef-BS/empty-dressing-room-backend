import  express from "express";
import { ajouterCommandePoints , getAllCommands, getMyCommande } from "../controllers/Payment.js";



const router = express.Router();

router.route("/ajoutercommande/:idclient/:idvendeur/:idproduit").post(ajouterCommandePoints);
router.route("/getmycommande/:id").get(getMyCommande);
router.route("/").get(getAllCommands);

export default router;