import 'dotenv/config';

export const mongoConfig = {
    host: process.env.MONGO_HOST,
    username: process.env.MONGO_USER,
    password: process.env.MONGO_PASS,
    port: process.env.MONGO_PORT,
    database: process.env.MONGO_NAME,
}

module.exports = mongoConfig;
//Para migrations