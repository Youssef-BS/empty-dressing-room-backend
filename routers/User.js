import express from "express";

import {deleteUser, getUser, getUsres, login, logout, register, test, updateUser} from "../controllers/Users.js"


const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/").get(getUsres);
router.route("/:id").delete(deleteUser);
router.route("/:id").get(getUser);
router.route("/:id").put(updateUser);
router.route('/test').post(test)

export default router ; 