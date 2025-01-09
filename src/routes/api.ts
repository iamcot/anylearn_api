"use strict";

import express from "express";

const apiRoute = express.Router();

apiRoute.get("/", (req, res) => {
    res.json({ status: "OK" });
}); 

export default apiRoute;
