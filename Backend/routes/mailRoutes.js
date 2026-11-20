import express from "express";
import { contactUs } from "../controllers/mailControllers.js";


const mailRoute = express.Router() ;

mailRoute.post("/client-mail",contactUs);

export default mailRoute ;