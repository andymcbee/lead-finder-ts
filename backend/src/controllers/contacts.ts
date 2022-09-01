import express, { Application, Request, Response, NextFunction } from "express";
import { returnRootDomain } from "../services/returnRootDomain";
import { createPotentialEmailMatchesArray } from "../services/createPotentialEmailMatchesArray";
import { checkEmailValidity } from "../services/checkEmailValidity";
import {pool} from "../db"


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

/*  /api/v1/contacts/create
 JSON body example:
{
  "fName": "Andrew",
  "lName": "McBurney",
  "website": "https://getreviewrobin.com/"
 
} */
export const addContact = async (req: Request, res: Response) => {
  const {fName, lName, website }:reqBodyI = req.body;

  console.log(fName)



  //global vars
  let validEmailData: emailDataI | boolean = false

  //res.status(401).json("You can update only your account!");
  //******if fName is empty, return error
if(!fName) {
  return res.status(400).json({"success": false, "message": "First name is a required field."});
}
if(!website) {
  return res.status(400).json({"success": false, "message": "Website is a required field."});
}

//var queryText = 'INSERT INTO users(password_hash, email) VALUES($1, $2) RETURNING id'


let newContactId
try {
//Create new contact in DB. Not aware of valid email status yet.
  const newContact = await pool.query("INSERT INTO contact (first_name, last_name, website) VALUES($1, $2, $3) RETURNING id", [fName, lName, website])
  newContactId = newContact.rows[0].id

} catch (error) {
  return res.status(400).json({"success": false, "message": "Error creating contact"});
}



//THIS NEEDS TO GO LATER IN THE CODE.... THE EMAIL IF VALID PLUS CATCHALLSTATUS


console.log("UPDATED CONTACT:::::::")

  const contactData: contactI = {
    fName,
    lName,
    website: returnRootDomain(website)
  };



  
  const emailArray = createPotentialEmailMatchesArray(contactData);

  for (let i = 0; i < emailArray.length; i++) {
    const checkEmail = async (email: string) => {
      const validEmailCheckData = await checkEmailValidity(email);

      if (validEmailCheckData?.data.result === "valid" || validEmailCheckData?.data.result === "catchall") {
        return validEmailCheckData;
      }
    };

    const validEmail = await checkEmail(emailArray[i]);
    //console.log("DATA::::");
    //console.log(data);
    
//refactor this to include CATCH ALL.
    if (validEmail?.data.result === "valid" || validEmail?.data.result === "catchall") {
      //****** SET THE GLOBAL VARIABLE TO ENSURE THIS GETS PASSED IN THE RESPONSE.
      //RETURN CONTACT WITH EMAIL
      console.log(validEmail)
      validEmailData = validEmail
      try {
 
        await pool.query(`UPDATE contact SET email = '${validEmailData.data.email}', emailStatus = '${validEmailData.data.result}' WHERE id = ${newContactId}`)
        
      } catch (error) {
          return res.status(400).json({"success": false, "message": "Error updating contact"});
        }
      break;
    }
  }

 


if(validEmailData){
  return res.status(200).json({"success": true, "emailFound": true, "message": "New contact created. Email was found." });


} else {
  return res.status(200).json({"success": true, "emailFound": false, "message": "No email found. Contact was created!" });


}



};

export const getContacts = async (req: Request, res: Response) => {
  console.log("GET ALL CONTACTS");
};







/* 
for (let i = 0; i < testArr.length; i++) {
  console.log(testArr[i])

  if (testArr[i] === "andrew@getreviewrobin.com") {
    

break  }
} */

  /* const even = async (element: string) => {
  console.log("IN EVEN FUNC")
  console.log(element)
  const validEmailCheckData = await checkEmailValidity(element)

  return validEmailCheckData?.data.result == "valid"
}

console.log(testArr.some(even)) */

  /* console.log(testArr)
const even = (element: string) => {
  console.log("IN EVEN FUNC")
  console.log(element)
  return element === "andrew@getreviewrobin.com"
} */

  //Pass each value through to see if valid
  //return a response if valid

  //if no valid found, return a response saying that.

  /* const verifyEmail = async (
    firstName: string,
    lastName: string,
    website: string
  ) => {
    console.log(firstName);
    console.log(lastName);
    console.log(website);
    try {
      const { data } = await axios.post(
        `https://api.neverbounce.com/v4/single/check?key=${
          process.env.NEVERBOUNCE_API_KEY
        }&email=${"andrew@getreviewrobin.com"}`
      );

      console.log(data);

      // res.status(201).json(data);
    } catch (error) {
      //  res.status(409).json(error);
      console.log(error);
    }
  };

  const contactData: reqBodyI = {
    fName: "Andrew",
    lName: "McBurney",
    website: "getreviewrobin.com"
  };

  //verifyEmail("Andrew", "McBurney", "https://getreviewrobin.com/");

  //returnRootDomain("https://www.getreviewrobin.com?param=123");
  createPotentialEmailMatchesArray(contactData);

  return res.status(200).json({ message: reqBody }); */