import express from "express";

import { deleteUser, getUser, getUsres, login, logout, register, updateUser , getPprofile, getAllProfileWproduct,addStars} from "../controllers/Users.js"
import { isAuthenticated } from "../middleware/verifyToken.js";


const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/").get( getUsres);
router.route("/:id").delete(isAuthenticated ,deleteUser);
router.route("/:id").get(getUser);
router.route("/:id").put(isAuthenticated ,updateUser);
router.route("/getprofile/user/:id").get(getPprofile);
router.route("/getprofileproduct/products").get(getAllProfileWproduct);
router.route("/rateuser/s/:id/:me").post(addStars);



export default router ; 
