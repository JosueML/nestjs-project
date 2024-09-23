export const EnvConfiguration = () => ({
    enviroment: process.env.NODE_ENV || 'dev',
    port: +process.env.PORT || 3000,
    jwtToken: process.env.JWT_TOKEN,
    dbHost: process.env.DB_HOST,
    dbPort: +process.env.DB_PORT,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
});
