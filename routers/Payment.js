import  express from "express";
import { ajouterCommandePoints , getAllCommands, getMyCommande, produitArrive } from "../controllers/Payment.js";



const router = express.Router();

router.route("/ajoutercommande/:idclient/:idvendeur/:idproduit").post(ajouterCommandePoints);
router.route("/getmycommande/:id").get(getMyCommande);
router.route("/").get(getAllCommands);
router.route("/:id").put(produitArrive);
export default router;