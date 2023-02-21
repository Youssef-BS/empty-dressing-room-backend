import  express, { Router } from "express";
import { addMessage , getConversation} from "../controllers/Msg.js";

const router = express.Router();

router.route("/msgSend/:id/:idtouser/:idproduct").post(addMessage);
router.route("/msgSend/:id/:idtouser").get(getConversation);

export default router;