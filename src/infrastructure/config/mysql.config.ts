//Arquivo que todo banco de dados vai usar para fazer sua conexão, para não ser preciso ficar alterando os arquivos, será pego por fora dados enviados pelo '.env'
import 'dotenv/config';

export const databaseConfig = {
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    dialect: 'mysql'
}

module.exports = databaseConfig;