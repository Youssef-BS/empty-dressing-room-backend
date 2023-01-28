import  express  from "express";
import User from "./routers/User.js";
import  Produit  from "./routers/Produit.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

export const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended : true}));
app.use(cors());
app.use(
    fileUpload({
      limits: { fileSize: 50 * 1024 * 1024 },
      useTempFiles: true,
    })
  );
 




app.use("/api/users" , User);
app.use("/api/prouits" , Produit)