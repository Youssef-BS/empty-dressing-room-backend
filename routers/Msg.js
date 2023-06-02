import  express, { Router } from "express";
import { addMessage , getConversation , Notification , gettwo} from "../controllers/Msg.js";

const router = express.Router();

router.route("/msgSend/:id/:idtouser").post(addMessage);
router.route("/msgSend/:id/:idtouser").get(getConversation);
router.route("/msgSend/:id").get(Notification)
router.route("/get/gettwo/:id").get(gettwo);

export default router;