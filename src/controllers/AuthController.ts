import { Request, Response } from "express";
import Authentication from "../utils/Authentication";
const db = require("../db/models");

class AuthController  {
    register = async (req: Request, res: Response): Promise<Response> => {
        const { username, password } = req.body;

        const hashedPassword = await Authentication.passwordHas(password);

         await db.user.create({ username, password: hashedPassword });

        return res.send("Create Sukses!!")
    }
    login = async (req: Request, res: Response): Promise<Response> => {
        // cari data di database berdasarkan user
        const { username, password } = req.body;

        const user = await db.user.findOne({
            where: {username}
        })


        //check password 
            let compare = await Authentication.passwordCompare(password, user.password);  
        // generate token
        if (compare) {
            let token =  Authentication.generateToken(user.id, username, user.password);
            return res.send({token});
        }

        return res.send("auth Failed")
    }

    profile = (req:Request, res: Response) => {
        res.send(req.app.locals.credential)
    }
    
}

export default new AuthController()