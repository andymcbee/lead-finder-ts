import express, { Application, Request, Response, NextFunction } from "express";
import { addContact, getContacts } from "../controllers/contacts";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/create", auth, addContact);
router.get("/:accountId", auth, getContacts);

export default router;
