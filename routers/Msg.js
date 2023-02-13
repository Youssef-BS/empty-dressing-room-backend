import  express, { Router } from "express";
import { addMessage } from "../controllers/Msg.js";

const router = express.Router();

router.route("/msgSend/:id/:idtouser").post(addMessage);

export default router;