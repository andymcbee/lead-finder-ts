import express, { Application, Request, Response, NextFunction } from "express";
import { returnRootDomain } from "../services/returnRootDomain";
import { createPotentialEmailMatchesArray } from "../services/createPotentialEmailMatchesArray";
import { checkEmailValidity } from "../services/checkEmailValidity";
import { pool } from "../db";

interface reqBodyI {
  fName: string;
  lName: string;
  website: string;
}

interface emailDataI {
  data: {
    status: string;
    result: string;
    flags: [];
    suggested_correction: string;
    execution_time: number;
    email: string;
  };
}

interface contactI {
  fName: string;
  lName: string;
  website: string;
}

export const addContact = async (req: Request, res: Response) => {
  const { fName, lName, website }: reqBodyI = req.body.data;
  console.log("BACKEND REQ.BODY:::::::");
  console.log(req.body);

  //global vars
  let validEmailData: emailDataI | boolean = false;

  //res.status(401).json("You can update only your account!");
  //******if fName is empty, return error
  if (!fName) {
    return res
      .status(400)
      .json({ success: false, message: "First name is a required field." });
  }
  if (!website) {
    return res
      .status(400)
      .json({ success: false, message: "Website is a required field." });
  }

  //var queryText = 'INSERT INTO users(password_hash, email) VALUES($1, $2) RETURNING id'

  let newContactId;
  try {
    //Create new contact in DB. Not aware of valid email status yet.
    const newContact = await pool.query(
      "INSERT INTO contact (first_name, last_name, website) VALUES($1, $2, $3) RETURNING id",
      [fName, lName, website]
    );
    newContactId = newContact.rows[0].id;
    console.log("NEW CONTACT ID::::");
    console.log(newContactId);
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Error creating contact" });
  }

  const contactData: contactI = {
    fName,
    lName,
    website: returnRootDomain(website)
  };
  console.log("UPDATED CONTACT:::::::");
  console.log(contactData);

  const emailArray = createPotentialEmailMatchesArray(contactData);
  console.log("EMAIL ARRAY::::");
  console.log(emailArray);
  for (let i = 0; i < emailArray.length; i++) {
    const checkEmail = async (email: string) => {
      const validEmailCheckData = await checkEmailValidity(email);
      console.log("EMAIL VALID CHECK - IN LOOP.....");
      console.log(validEmailCheckData);

      if (
        validEmailCheckData?.data.result === "valid" ||
        validEmailCheckData?.data.result === "catchall"
      ) {
        return validEmailCheckData;
      }
    };

    const validEmail = await checkEmail(emailArray[i]);
    //console.log("DATA::::");
    //console.log(data);

    //refactor this to include CATCH ALL.
    if (
      validEmail?.data.result === "valid" ||
      validEmail?.data.result === "catchall"
    ) {
      //****** SET THE GLOBAL VARIABLE TO ENSURE THIS GETS PASSED IN THE RESPONSE.
      //RETURN CONTACT WITH EMAIL
      console.log(validEmail);
      validEmailData = validEmail;
      try {
        await pool.query(
          `UPDATE contact SET email = '${validEmailData.data.email}', emailStatus = '${validEmailData.data.result}' WHERE id = ${newContactId}`
        );
      } catch (error) {
        return res
          .status(400)
          .json({ success: false, message: "Error updating contact" });
      }
      break;
    }
  }

  if (validEmailData) {
    console.log("VALID EMAIL WAS FOUND...");
    return res
      .status(200)
      .json({
        success: true,
        emailFound: true,
        message: "New contact created. Email was found.",
        email: validEmailData.data.email
      });
  } else {
    return res
      .status(200)
      .json({
        success: true,
        emailFound: false,
        message: "No email found. Contact was created!"
      });
  }
};

export const getContacts = async (req: Request, res: Response) => {
  console.log("GET ALL CONTACTS");
};
