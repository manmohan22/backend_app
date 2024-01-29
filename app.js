import express from "express";
import cookieParser from "cookies-parser"
import user from "./routers/router.user.js";
export const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())
app.use("api/v1", user);