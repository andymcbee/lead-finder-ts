import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import contactsRoute from "./routes/contactsRoute";
import {pool} from "./db"


const app: Application = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT || 5001;

app.use("/api/v1/contacts", contactsRoute);

 app.post("/test", async (req, res) => {

        try {
            const {fName, lName, website} = req.body

            const newContact = await pool.query("INSERT INTO contact (first_name, last_name, website) VALUES($1, $2, $3)", [fName, lName, website])
      res.json(newContact)
        
        
        } catch (error) {
            console.log(error)
        }

}) 

app.listen(port, () => console.log(`server running on port: ${port}`));

/* const add = (a: number, b: number): number => a+b
//How do I declare the return value as a type when not implicit returning?
 */
