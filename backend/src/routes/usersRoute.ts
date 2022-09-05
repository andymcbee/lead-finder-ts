import express, { Application, Request, Response, NextFunction } from "express";
const router = express.Router();
import { signup, signin } from "../controllers/users";

router.post("/signup", signup);
router.post("/signin", signin);


export default router;
