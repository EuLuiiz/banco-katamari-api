//Todas as configurações básicas da API, inicio de tudo
import express from 'express';
import * as http from 'http';

//Gerar log
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
//evitar erro cors
import cors from 'cors';
//Debug
import debug from 'debug';

//Arquivos
import { CommonRoutesConfig } from '../../../adapters/apis/routes/common.routes.config'
import { ClientsRoutes } from '../../../adapters/apis/routes/clients.routes.config';
import { AccountsRoutes } from '../../../adapters/apis/routes/accounts.routes.config';
// import { AccountsRoutes } from './account/accounts.routes.config';

//Iniciando a Aplicação
const app: express.Application = express();
//Iniciando o Servidor
const server: http.Server = http.createServer(app);
//Porta
const port = 3000;
//Rotas
//Informando que as rotas será um array de várias rotas usando a regra do CommonRoutesConfig
const routes: CommonRoutesConfig[] = [];
//Configurando Debug
const debugLog: debug.IDebugger = debug('app');

//Usos da api
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

//Log
const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    )
}

//Configurando o tipo de log (se vai mostrar um log todo trabalhado ou simples)
if (!process.env.DEBUG) {
    loggerOptions.meta = false;
}
app.use(expressWinston.logger(loggerOptions));
//

//Adicionando a rota de clientes no array usando no app
routes.push(new ClientsRoutes(app));
routes.push(new AccountsRoutes(app));

const runningMensage = `Servidor: OK [Porta: ${port}]`;
//Uma rota simples apenas para testar se está funcionando
app.get('/', (request: express.Request, response: express.Response) => {
    response.status(200).send(runningMensage);
})

//Listen (Iniciando o servidor de fato)
server.listen(port, () => {
    routes.forEach((route: CommonRoutesConfig) => {
        //Vai percorrer toda a lista de rotas criadas e informar elas no log, informando que está funcionando
        debugLog(`Rotas configuradas: ${route.getName}`);
    });
    console.log(runningMensage)
});