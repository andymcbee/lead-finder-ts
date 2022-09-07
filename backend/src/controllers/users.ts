
import express, { Application, Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { pool } from "../db"
import { v4 as uid } from 'uuid';
import { env } from 'process';




export const signup = async (req: Request, res: Response) => {


    interface userInfo {
        email: string
        password: string
        confirmPassword: string
    }



    const { email, password, confirmPassword }: userInfo = req.body.data


    if (!email || !password || !confirmPassword) {
        return res.status(400).json({ "message": "Missing fields. Must included email, password and confirm password.", "success": false })
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ "message": "Passwords don't match", "success": false })
    }

    try {
        const checkExistingUser = await pool.query('SELECT EXISTS(SELECT 1 FROM appusers WHERE email = $1)', [email])


        if (checkExistingUser.rows[0]?.exists) {
            return res.status(400).json({ "message": "User with provided email exists already.", "success": false })

        }
    } catch (error) {
        console.log(error)
        return res.status(405).json({ "message": error, "success": false })

    }



    let runCountUniqueAccountId = 0
    const createUniqueAccountId = async () => {

        const accountId = uid()
        const checkExistingAccountId = await pool.query('SELECT EXISTS(SELECT 1 FROM appusers WHERE accountId = $1)', [accountId])
        console.log(checkExistingAccountId.rows[0]?.exists)

        if (runCountUniqueAccountId > 10) {
            return res.status(400).json({ "message": "Error generating unique accountId.", "success": false })

        }

        if (checkExistingAccountId.rows[0]?.exists && runCountUniqueAccountId < 10) {
            runCountUniqueAccountId = runCountUniqueAccountId + 1
            console.log(runCountUniqueAccountId)
            console.log("IF STATMEENT FIRED... ")
            createUniqueAccountId()
        } else {
            return accountId
        }

    }

    const uniqueAccountId = await createUniqueAccountId()

    const hashedPassword = await bcrypt.hash(password, 10)


    try {
        const newUser = await pool.query("INSERT INTO appusers (email, password, accountId, isAccountOwner) VALUES($1, $2, $3, $4) RETURNING id, email, password, accountId, isAccountOwner", [email, hashedPassword, uniqueAccountId, true])



        const resEmail: string = newUser.rows[0].email
        const resAccountId: string = newUser.rows[0].accountid
        const resIsAccountOwner: boolean = newUser.rows[0].isaccountowner
        const resUserId: string = newUser.rows[0].id

        const token = jwt.sign({ userId: resUserId, accountId: resAccountId }, env.JWTSECRET || "SecretError")



        console.log(newUser.rows[0])
        return res.status(200).json({
            "message": "ok",
            "success": true,
            "data":
            {
                "email": resEmail,
                "accountId": resAccountId,
                "isAccountOwner": resIsAccountOwner,
                "userId": resUserId,


            },
            "token": token
        })

    } catch (error) {
        return res.status(400).json({ "message": "Error creating user.", "success": false })
    }

};



export const signin = async (req: Request, res: Response) => {


    interface userInfo {
        email: string
        password: string
        confirmPassword: string
    }


    const { email, password, confirmPassword }: userInfo = req.body.data


    if (!email || !password) {
        return res.status(400).json({ "message": "Missing fields. Must included email and password.", "success": false })
    }



    try {
        const checkExistingUser = await pool.query('SELECT EXISTS(SELECT 1 FROM appusers WHERE email = $1)', [email])


        if (!checkExistingUser.rows[0]?.exists) {
            return res.status(400).json({ "message": "Email does not exist.", "success": false })

        }
    } catch (error) {
        console.log(error)
        return res.status(405).json({ "message": error, "success": false })

    }


    const existingUser = await pool.query("SELECT * FROM appusers WHERE email = $1", [email])
    console.log("EXISTING USER::::")
    console.log(existingUser.rows[0])



    const hashedPassword = existingUser.rows[0].password
    const isCorrectPassword = await bcrypt.compare(password, hashedPassword)



    if (!isCorrectPassword) {
        return res.status(400).json({ "message": "Incorrect password.", "success": false })
    }



    const resEmail: string = existingUser.rows[0].email
    const resAccountId: string = existingUser.rows[0].accountid
    const resIsAccountOwner: boolean = existingUser.rows[0].isaccountowner
    const resUserId: string = existingUser.rows[0].id

    const token = jwt.sign({ userId: resUserId, accountId: resAccountId }, env.JWTSECRET || "SecretError")


    return res.status(200).json({
        "message": "ok",
        "success": true,
        "data":
        {
            "email": resEmail,
            "accountId": resAccountId,
            "isAccountOwner": resIsAccountOwner,
            "userId": resUserId,


        },
        "token": token
    })



}