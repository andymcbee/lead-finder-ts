import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import express, { Application, Request, Response, NextFunction } from "express";


dotenv.config();

const auth = async (req: Request, res: Response, next: NextFunction) => {
  // console.log(req.body.headers.Authorization);
  //body was added when hitting endpoint outside of redux or postman. Look into why.
  console.log("INSIDE MIDDLEARE");
  console.log(req.headers.authorization);
  console.log(req.headers);

  try {

    if (req.headers.authorization === undefined) {
      req.headers.authorization = ""
    }
    const token = req.headers.authorization.split(" ")[1]

    let decodedData;
    //handle custom token
    if (token) {
      //verify the token
      decodedData = jwt.verify(token, process.env.JWTSECRET || "SecretError");
      console.log("DECODED DATA...");
      console.log(decodedData);

      // req.userId = decodedData?.id;
    }

    next()
  } catch (error) {
    //this should return error to client
    console.log(error);
    return res.status(401).json({
      message: "Authorization denied. Log in to continue.",
      error: true
    });
  }
};

export default auth;
