import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import contactsRoute from "./routes/contactsRoute";
import usersRoute from "./routes/usersRoute";

import { pool } from "./db";

const app: Application = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
/* app.use(cors({
        origin: 'http://localhost:3000/'
})); */
const port = process.env.PORT || 5001;

app.use("/api/v1/contacts", contactsRoute);
app.use("/api/v1/users", usersRoute);

app.post("/test", async (req, res) => {
  console.log(req.body);
  console.log("TESDT API HIT...");
  console.log(req.body.content[0]);
});

app.listen(port, () => console.log(`server running on port: ${port}`));

/* const add = (a: number, b: number): number => a+b
//How do I declare the return value as a type when not implicit returning?
 */
console.log("test");
