export default () => ({
    port: parseInt(process.env.PORT as string, 10) || 3000,
    database: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT as string, 10) || 3306
    }
});