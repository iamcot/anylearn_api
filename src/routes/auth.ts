"use strict";

import { UserRepo } from "@database/user.repo";
import express from "express";

const authRoute = express.Router();

authRoute.get("/login", async (req: express.Request, res: express.Response) =>  {
    const phone: string = req.query.phone as string;
    const password: string = req.query.password as string;
   
    const results = await UserRepo.findByPhone(phone);
    res.json(results);
}); 

export default authRoute;
