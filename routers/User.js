import express from "express";

import {deleteUser, getUser, getUsres, login, register, updateUser} from "../controllers/Users.js"


const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/").get(getUsres);
router.route("/:id").delete(deleteUser);
router.route("/:id").get(getUser);
router.route("/:id").put(updateUser);

export default router ; 