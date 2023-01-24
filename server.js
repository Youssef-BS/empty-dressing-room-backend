import {app} from "./app.js"
import {config} from "dotenv"
import { connectDatabase } from "./config/database.js"
import cloudinary from "cloudinary";


config({
    path : "./config/config.env"
})

connectDatabase();

cloudinary.config({
    cloud_name : "dggcqog8y",
    api_key : "319574675196894",
    api_secret : "GMfyJ_C0Dz0ykltVYooYh5Pc0tI"
});


app.listen(process.env.PORT , ()=>{
console.log("Server is Running " + process.env.PORT)
})