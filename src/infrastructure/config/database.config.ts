//Arquivo que todo banco de dados vai usar para fazer sua conexão, para não ser preciso ficar alterando os arquivos, será pego por fora dados enviados pelo '.env'

export default {
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    db: process.env.DB_NAME
}