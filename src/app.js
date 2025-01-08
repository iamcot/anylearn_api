import express from "express";
import { configDotenv } from "dotenv";
import api from "./routes/api.js";

const app = express();
configDotenv();

app.use('/', api);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});