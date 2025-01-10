import 'reflect-metadata';
import express, { NextFunction } from "express";
import { configDotenv } from "dotenv";
import apiRoute from '@router/api';
import { UserRepo } from '@database/user.repo';
import authRoute from '@router/auth';

const app = express();
configDotenv();

app.use('/', apiRoute);
app.use('/auth', authRoute);

// 404 middleware
app.use((req: express.Request, res: express.Response) => {
    res.status(404).send({ message: `Route ${req.url} not found` });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Something broke!' });
});

const PORT = parseInt(process.env.PORT as string, 10) || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});