import express from "express";
import { login } from "../controller/login/Login";
import { sessionValidation } from "../middlewares/auth";
import { signup } from "../controller/login/Signup";
import {
  getAllProperties,
  Propertylisting,
} from "../controller/Propertylisting/Propertylisting";

const mainRouter = express.Router();

mainRouter.post("/login", login);
mainRouter.post("/signup", signup);
mainRouter.get("/propertylist", sessionValidation, getAllProperties);
mainRouter.post("/propertyRecommend", sessionValidation, Propertylisting);

export default mainRouter;
