"use strict";

import { UserRepo } from "@database/user.repo";
import express from "express";
import bcrypt  from "bcryptjs";

const authRoute = express.Router();

authRoute.get("/login", async (req: express.Request, res: express.Response) =>  {
    const phone: string = req.query.phone as string;
    const password: string = req.query.password as string;
   
    let results = await UserRepo.findByPhone(phone);
    const hashPassword = await bcrypt.hash(password || 'abcd1234', 10 );
    (results as any)['compare-password'] = await bcrypt.compare(password, results['password']);
    res.json(results);
}); 

export default authRoute;
