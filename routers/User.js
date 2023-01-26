import express from "express";

import {addProduct, deleteUser, getUser, getUsres, login, logout, register, updateUser} from "../controllers/Users.js"
import { isAuthenticated } from "../middleware/verifyToken.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/").get(getUsres);
router.route("/:id").delete(deleteUser);
router.route("/:id").get(getUser);
router.route("/:id").put(updateUser);
router.route("/newproduit").post(isAuthenticated ,  addProduct);


export default router ; 