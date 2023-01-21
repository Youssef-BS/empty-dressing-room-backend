import  express  from "express";
import User from "./routers/User.js";
import cors from "cors";
export const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors())
app.use("/api/users" , User);