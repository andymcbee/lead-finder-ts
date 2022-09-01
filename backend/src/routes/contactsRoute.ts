import express, { Application, Request, Response, NextFunction } from "express";
import { addContact, getContacts } from "../controllers/contacts";
const router = express.Router();

router.post("/create", addContact);
router.get("/:accountId", getContacts);

export default router;
