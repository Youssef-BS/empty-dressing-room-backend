import express from "express";

import { deleteUser, getUser, getUsres, login, logout, register, updateUser , getPprofile, getAllProfileWproduct,addStars , verify} from "../controllers/Users.js"
import { isAuthenticated } from "../middleware/verifyToken.js";


const router = express.Router();

router.route("/register").post(register);
router.route("/verify").post(isAuthenticated,verify);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/").get( getUsres);
router.route("/:id").delete(deleteUser);
router.route("/:id").get(getUser);
router.route("/:id").put(updateUser);
router.route("/getprofile/user/:id").get(getPprofile);
router.route("/getprofileproduct/products").get(getAllProfileWproduct);
router.route("/rateuser/s/:id/:me").put(addStars);

export default router ; 
