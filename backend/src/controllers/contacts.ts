import express, { Application, Request, Response, NextFunction } from "express";
import { returnRootDomain } from "../services/returnRootDomain";
import { createPotentialEmailMatchesArray } from "../services/createPotentialEmailMatchesArray";
import { checkEmailValidity } from "../services/checkEmailValidity";

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

/*  /api/v1/contacts/create
 JSON body example:
{
  "fName": "Andrew",
  "lName": "McBurney",
  "website": "https://getreviewrobin.com/"
 
} */
export const addContact = async (req: Request, res: Response) => {
  const reqBody: reqBodyI = req.body;

  //global vars
  let validEmailData: emailDataI | boolean = false

  //res.status(401).json("You can update only your account!");
  //******if fName is empty, return error

  //******if website is empty, return error


  const contactData: reqBodyI = {
    fName: reqBody.fName,
    lName: reqBody.lName,
    website: returnRootDomain(reqBody.website)
  };


  //******CREATE THE CONTACT HERE.... ASYNC

  
  const emailArray = createPotentialEmailMatchesArray(contactData);

  for (let i = 0; i < emailArray.length; i++) {
    const checkEmail = async (email: string) => {
      const validEmailCheckData = await checkEmailValidity(email);

      if (validEmailCheckData?.data.result === "valid") {
        return validEmailCheckData;
      }
    };

    const validEmail = await checkEmail(emailArray[i]);
    //console.log("DATA::::");
    //console.log(data);
    
//refactor this to include CATCH ALL.
    if (validEmail?.data.result === "valid") {
      //****** SET THE GLOBAL VARIABLE TO ENSURE THIS GETS PASSED IN THE RESPONSE.
      //RETURN CONTACT WITH EMAIL
      console.log(validEmail)
      validEmailData = validEmail
      break;
    }
  }

 


if(validEmailData){
  //update the contact
  //return valid email res + 
  console.log("VALID EMAIL EXISTS...")
  return validEmailData
} else {
// RETURN CONTACT WITH NO EMAIL
console.log("No valid email found")
return "noValidEmail"

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