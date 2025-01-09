import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import  {User}  from '@entity/user.entity';
import path from 'path';

dotenv.config();
// const __dirname = path.resolve();
// console.log(__dirname);

const AppDataSource = new DataSource({
    type: 'mysql',
    poolSize: parseInt(process.env.DB_CONNECTION_LIMIT as string),
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: parseInt(process.env.DB_PORT as string),
    database: process.env.DB_NAME,
    entities: ["src/entity/*.{ts,js}"],
    synchronize: false,
    logging: true
});

if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize().catch((err) => {
        console.error(err);
    }).then(() => {
        console.log('Database connected');
    });
}

export default AppDataSource;